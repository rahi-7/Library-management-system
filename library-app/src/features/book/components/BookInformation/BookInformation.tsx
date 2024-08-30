import { Book } from "../../../../models/Book"
import { mapAuthorsToString } from "../../utils/BookUtils"
import "./BookInformation.css"
import React from "react"

interface BookInfoProp{
    book:Book
}

export const BookInformation:React.FC<BookInfoProp> = ({book}) => {

    return (
        <div className="book-info">
            <div className="book-info-container">
                <img className="book-info-cover" src={book.cover} />
                <div className="book-info-details">
                    <h2>{book.title}</h2>
                    <h3>{mapAuthorsToString(book)}</h3>
                    <p>{book.description}</p>
                </div>
            </div>
        </div>
        
    )
}