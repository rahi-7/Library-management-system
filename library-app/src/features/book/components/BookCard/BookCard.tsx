import { useDispatch, useSelector } from "react-redux"
import { Book } from "../../../../models/Book"
import { mapAuthorsToString } from "../../utils/BookUtils"
import "./BookCard.css"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import React, { useEffect, useState } from "react"
import { setCurrentBook } from "../../../../redux/slices/BookSlice"
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice"

interface BookCardProps {
    book: Book
}

export const BookCard:React.FC<BookCardProps> = ({book}) => {

    const user = useSelector((state:RootState)=> state.authentication.loggedInUser)
    const dispatch:AppDispatch = useDispatch()
    const [available, setAvailable] = useState<boolean>(()=> {
        if (book.records.length === 0) return true

        return book.records[0].status === "AVAILABLE"
    })
    const [buttonClass, setButtonClass] = useState<string>("")
    const navigate = useNavigate()

    const handleLoan = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (user?.type === "EMPLOYEE") {
            dispatch(setCurrentBook(book))
            dispatch(setDisplayLoan(true))
        }
    }

    const displayBook = () => {
        navigate(`/resource/${book.barcode}`)
    }

    useEffect(()=>{
        let c = "book-card-loan-button"

        if (available) {
            c += " available"
        } else {
            c += " unavailable"
        }

        if (user && user.type === "EMPLOYEE" && available) {
            c += " checkout"
        } else if (user && user.type === "EMPLOYEE" && !available) {
            c += " checkin"
        }

        setButtonClass(c)

    },[available, user, user?.type, book.records])

    return (
        <div className="book-card" id="book-card" onClick={displayBook}>
            <img src={book.cover} alt="book cover" className="book-card-cover"/>
            <div className="book-card-info">
                <h1 className="book-card-title">{book.title}</h1>
                <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
                <p className="book-card-description">{book.description}</p>
            </div>
            <button className={buttonClass} onClick={handleLoan}>Status: {available ? "AVAILABLE" : "UNAVAILABLE"}</button>
        </div>
    )
}   