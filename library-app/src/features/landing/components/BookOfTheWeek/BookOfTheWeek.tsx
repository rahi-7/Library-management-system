import { BookInformation } from "../../../book"
import "./BookOfTheWeek.css"

export  function BookOfTheWeek() {
    return (
        <div className="book-of-the-week">
            <h1>Book of the Week</h1>
            <BookInformation 
                book={
                    {
                        _id: "1234",
                        barcode: "1234",
                        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
                        title: "Java: The ultimate Beginner's guide to learn Java Quickly with no prior Experience",
                        authors: ["Mark Reed"],
                        description: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted \"gin was the national drink and sex the national obsession,\" it is an exquisitely crafted tale of America in the 1920s.The Great Gatsby is one of the great classics of twentieth-century literature.",
                        subjects: ["java", "learning"],
                        publicationDate: new Date("2024-01-01"),
                        publisher: "some publisher",
                        pages: 500,
                        genre: "Non-fiction",
                        records:[]
                    }
                }/>
        </div>
    )
}