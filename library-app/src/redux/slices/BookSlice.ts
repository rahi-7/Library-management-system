import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios"
import { Book, CheckInBookPayload, CheckoutBookPayload } from "../../models/Book";
import { PageInfo } from "../../models/Page";

interface BookSliceState {
    loading:boolean
    error: boolean
    books: Book[]
    currentBook: Book | undefined
    pagingInformation: PageInfo | null
}

const initialState:BookSliceState = {
    loading: true,
    error: false,
    books: [],
    currentBook: undefined,
    pagingInformation: null
}

export const fetchAllBooks = createAsyncThunk(
    "book/all",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8000/book/");
            return response.data.books
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const queryBooks = createAsyncThunk(
    "book/query",
    async (payload:string, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/book/query${payload}`);
            console.log(response.data.page);
            return response.data.page
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const checkoutBook = createAsyncThunk(
    "book/checkout",
    async (payload:CheckoutBookPayload, thunkAPI) => {
        try {
            let returnDate = new Date()
            returnDate.setDate(returnDate.getDate() + 14)
            console.log(payload.libraryCard);
            const getPatron = await axios.get(`http://localhost:8000/card/${payload.libraryCard}`);
            console.log(getPatron)
            const patronId = getPatron.data.libraryCard.user._id
            
            const record = {
                status: "LOANED",
                loanedDate: new Date(),
                dueDate: returnDate,
                patron: patronId,
                employeeOut: payload.employee._id,
                item: payload.book._id,
            }

            const loanReq = await axios.post(`http://localhost:8000/loan`, record)
            const loan = loanReq.data.record

            return loan
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const checkInBook = createAsyncThunk(
    "book/checkin",
    async (payload:CheckInBookPayload, thunkAPI) => {
        try {
            const record = payload.book.records[0]
            const updateRecord = {
                status: "AVAILABLE",
                returnedDate: new Date(),
                employeeIn: payload.employee._id,
                loanedDate: record.loanedDate,
                dueDate: record.dueDate,
                patron: record.patron,
                employeeOut: record.employeeOut,
                item: record.item,
                _id: record._id
            }
            const loan = await axios.put(`http://localhost:8000/loan/`, updateRecord)
            return loan.data.record
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loadBookByBarcode = createAsyncThunk(
    "book/id",
    async (payload:string, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/book/query?barcode=${payload}`);
            const book = response.data.page.items[0]

            if (!book || book.barcode !== payload) {
                throw new Error()
            }

            return book
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const BookSlice = createSlice({
    name:"book",
    initialState,
    reducers: {
        setCurrentBook(state, action:PayloadAction<Book | undefined>) {
            state = {
                ...state,
                currentBook: action.payload
            }

            return state;
        }
    },
    extraReducers: (builder) => {
        //pending
        builder.addCase(fetchAllBooks.pending, (state) => {
            state = {
                ...state,
                books: [],
                loading: true
            }

            return state
        })
        builder.addCase(queryBooks.pending, (state)=>{
            state = {
                ...state,
                books: [],
                loading: true
            }

            return state
        })
        builder.addCase(checkoutBook.pending, (state, action)=> {
            state = {
                ...state,
                loading:true,
            }

            return state;
        })

        builder.addCase(checkInBook.pending, (state, action)=> {
            state = {
                ...state,
                loading: true
            }

            return state
        })
        builder.addCase(loadBookByBarcode.pending, (state)=> {
            state = {
                ...state,
                loading: true
            }

            return state
        })

        //fulfilled
        builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
            state = {
                ...state,
                books: action.payload,
                loading: false
            }
            return state
        });
        builder.addCase(queryBooks.fulfilled, (state, action)=> {
            console.log(action.payload)
            state = {
                ...state,
                books: action.payload.items,
                loading: false,
                error: false,
                pagingInformation: {
                    totalCount: action.payload.totalCount,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                    pageCount: action.payload.pageCount
                }
            }

            return state
        })

        builder.addCase(checkoutBook.fulfilled, (state, action) => {
            let bookList:Book[] = JSON.parse(JSON.stringify(state.books))
            bookList = bookList.map((book)=> {
                if(book._id === action.payload.item) {
                    book.records = [action.payload, ...book.records]
                    return book
                }

                return book
            })

            state = {
                ...state,
                books: bookList,
                loading: false
            }

            return state
        })

        builder.addCase(checkInBook.fulfilled, (state, action) => {
            let bookList:Book[] = JSON.parse(JSON.stringify(state.books))
            bookList = bookList.map((book)=> {
                if(book._id === action.payload.item) {
                    book.records.splice(0, 1, action.payload)
                    return book
                }

                return book
            })

            state = {
                ...state,
                books: bookList,
                loading: false
            }

            return state

        })

        builder.addCase(loadBookByBarcode.fulfilled, (state, action)=> {
            state = {
                ...state,
                loading: false,
                currentBook: action.payload
            }

            return state
        })

        //error
        builder.addCase(fetchAllBooks.rejected, (state) => {
            state = {
                ...state,
                error: true,
                loading: false
            }

            return state
        })
        builder.addCase(queryBooks.rejected, (state)=> {
            state={
                ...state,
                error: true,
                loading: false
            }

            return state
        })
        builder.addCase(loadBookByBarcode.rejected, (state)=> {
            state={
                ...state,
                error: true,
                loading: false
            }

            return state
        })
    }
})

export const {setCurrentBook} = BookSlice.actions

export default BookSlice.reducer