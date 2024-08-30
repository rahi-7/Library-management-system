import { Book } from "../../../models/Book";
import { BookCheckin } from "../components/BookCheckin/BookCheckin";
import { BookCheckout } from "../components/BookCheckout/BookCheckout";

export function mapAuthorsToString(book:Book) {
    let authors = "";
    if (book.authors) {
        authors = book.authors.join(", ");
    }
    return authors
}

export function determineLoanMoadalContent(book:Book) {
    if (book.records.length === 0 || book.records[0].status === "AVAILABLE") {
        return <BookCheckout />
    }

    return <BookCheckin />
}