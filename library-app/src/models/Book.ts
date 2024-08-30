import { LoanRecord } from "./LoanReacord"
import { User } from "./User"

export type Book = {
    _id: string
    barcode: string
    cover:string
    title: string
    authors: string[]
    description: string
    subjects: string[]
    publisher: string
    publicationDate: Date
    pages: number
    genre:string
    records:LoanRecord[]
}

export type CheckoutBookPayload = {
    book: Book;
    libraryCard:string;
    employee:User;
}

export type CheckInBookPayload = {
    book: Book;
    employee:User;
}
