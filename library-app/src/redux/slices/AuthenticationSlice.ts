import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchUserPayload, LoginUserPayload, RegisterUserPayload, User } from "../../models/User";

export interface AuthenticationSliceState {
    loggedInUser: User | undefined;
    profileUser: User | undefined;
    libraryCard:string;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    registerisSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
    loggedInUser: undefined,
    profileUser: undefined,
    libraryCard: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    registerisSuccess: false
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (user: LoginUserPayload, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", user);
            return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (user: RegisterUserPayload, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/register", user);
            return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchUser = createAsyncThunk(
    "auth/fetch",
    async (payload: FetchUserPayload, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${payload.userId}`);
            const user = response.data.user;
            return {
                user,
                property: payload.property,
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateUser = createAsyncThunk(
    "auth/update",
    async (payload: User, thunkAPI) => {
        try {
            console.log(payload)
            const response = await axios.put(`http://localhost:8000/users`, payload);
            return response.data.user;
        } catch(err){
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getLibraryCard = createAsyncThunk(
    "auth/libraryCard",
    async (userId: string, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:8000/card/`, {
                user: userId
            });
            return response.data.libraryCard;
        } catch(err){
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        resetRegisterSuccess(state) {
            state.registerisSuccess = false; // Directly modify using immer's draft
            return state;
        },
        resetUser(state, action:PayloadAction<string>) {
            state = {
                ...state,
                [action.payload]: undefined
            }

            return state
        }
    },
    extraReducers: (builder) => {
        builder
        //pending
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                return state;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.registerisSuccess = false;
                return state;
            })
            .addCase(fetchUser.pending, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    registerisSuccess:true
                }

                return state
            })
            .addCase(updateUser.pending, (state, action) => {
                state = {
                    ...state,
                    isError: false,
                    isLoading: false,
                }

                return state
            })
            .addCase(getLibraryCard.pending, (state)=> {
                state = {
                    ...state,
                    isLoading: true,
                    isError:false
                }
                return state
            })

            //filfilled
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loggedInUser = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                return state;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.registerisSuccess = true; // Set registerisSuccess to true
                return state;
            })
            .addCase(fetchUser.fulfilled, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    [action.payload.property]: action.payload.user
                }

                return state
            })
            .addCase(updateUser.fulfilled, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    loggedInUser: action.payload,
                    profileUser: action.payload
                }

                return state
            })
            .addCase(getLibraryCard.fulfilled, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    libraryCard: action.payload._id,
                    isError:false
                }
                return state
            })

            //rejected
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                return state;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                return state;
            })
            .addCase(fetchUser.rejected, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    isError: true
                }

                return state
            })
            .addCase(updateUser.rejected, (state, action)=> {
                state = {
                    ...state,
                    isLoading: false,
                    isError: true
                }

                return state
            })
    },
});

export const { resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
