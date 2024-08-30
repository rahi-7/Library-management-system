import { Book } from "../../../../models/Book"
import { BookHistoryItem } from "../BookHistoryItem/BookHistoryItem"
import "./BookHistory.css"
import React from "react"

interface BookHistoryProps {
    book: Book
}

export const BookHistory:React.FC<BookHistoryProps> = ({book}) => {

    return (
        <div className="book-history">
            <h2>Loan History</h2>
            <div className="book-history-box">
                {
                    book.records.map((record)=> {
                        return <BookHistoryItem key={record._id} record={record} />
                    })
                }
            </div>
        </div>
    )
}