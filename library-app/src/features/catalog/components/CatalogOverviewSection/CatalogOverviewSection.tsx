import "./CatalogOverViewSection.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Book } from "../../../../models/Book"
import { RootState } from "../../../../redux/ReduxStore"
import { BookCarousel } from "../../../book"

interface CatalogOverViewSectionProps {
    books: Book[],
    label:string
}


export const CatalogOverviewSection:React.FC<CatalogOverViewSectionProps> = ({books,label}) => {

    const bookState = useSelector((state:RootState)=> state.book)
    const navigate = useNavigate()

    const handleViewMore = () => {
        navigate(`/catalog?genre=${label}&subject=${label}`)
    }


    return (
        <div className="catalog-overview-section">
            <div className="catalog-overview-section-top">
                <h4>{label}</h4>
                <p className="catalog-overview-section-more" onClick={handleViewMore}>View more...</p>
            </div>
            {books.length > 0 && !bookState.loading && <BookCarousel books={books} />}
        </div>
    )
}