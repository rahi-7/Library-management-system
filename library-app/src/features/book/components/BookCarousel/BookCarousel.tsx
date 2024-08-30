import { useState } from "react"
import { Book } from "../../../../models/Book"
import "./BookCarousel.css"
import { BookCard } from "../BookCard/BookCard"

interface BookCarouselProps {
    books: Book[]
}

export const BookCarousel:React.FC<BookCarouselProps> = ({books}) => {

    const [order, setOrder] = useState<Book[]>(books)

    const moveLeft = () => {
        // eslint-disable-next-line prefer-const
        let reordered = [...order]
        // eslint-disable-next-line prefer-const
        let item = reordered.shift()!
        reordered.push(item)
        setOrder(reordered)
    }

    const moveRight = () => {
        // eslint-disable-next-line prefer-const
        let reordered = [...order]
        // eslint-disable-next-line prefer-const
        let item = reordered.pop()!
        reordered.unshift(item)
        setOrder(reordered)
    }

    return (
        <div className="book-carousel">
            <div className="book-carousel-left-button" onClick={moveLeft}>
                {"<"}
            </div>
            <div className="book-carousel-right-button" onClick={moveRight}>
                {">"}
            </div>
            {order.map(item => <BookCard key={item.barcode} book={item}/>)}
        </div>
    )
}