import "./BookCheckin.css"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { checkInBook, setCurrentBook } from "../../../../redux/slices/BookSlice"
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice"


export const BookCheckin:React.FC = () => {
    const book = useSelector((state:RootState)=> state.book.currentBook)
    const user = useSelector((state:RootState)=> state.authentication.loggedInUser)

    const dispatch:AppDispatch = useDispatch()

    const checkin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (book && user) {
            dispatch(checkInBook({
                book,
                employee: user
            }))
            dispatch(setDisplayLoan(false))
            dispatch(setCurrentBook(undefined))
        }
    }

    return (
        <div className="book-checkin">
             {
                book && user &&
                <form className="book-checkin-form">
                    <h3>Check In Book Titled: {book.title}</h3>
                    <h4>Check In Employee ID: </h4>
                    <input type="text" className="book-checkin-input" value={user._id} disabled />
                    <button className="book-checkin-button" onClick={checkin}>Check In</button>
                </form>
            }
        </div>
    )
}