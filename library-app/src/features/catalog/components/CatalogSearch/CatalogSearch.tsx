import { useDispatch, useSelector } from "react-redux"
import "./CatalogSearch.css"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { queryBooks } from "../../../../redux/slices/BookSlice"
import { BookCard } from "../../../book"
import { CatalogAdvancedSearch } from "../CatalogAdvancedSearch/CatalogAdvancedSearch"
import { CatalogSearchPageNavigator } from "../CatalogSearchPageNavigator/CatalogSearchPageNavigator"

export const CatalogSearch:React.FC = () => {

    const bookState = useSelector((state:RootState)=> state.book)
    const dispatch:AppDispatch = useDispatch()

    const location = useLocation()

    useEffect(()=> {
        console.log(location.search);
        
        dispatch(queryBooks(location.search))
    },[location.search])

    return (
        <div className="catalog-search">
            <div className="catalog-search-advanced-search-section">
                <CatalogAdvancedSearch />
            </div>
            {
                !bookState.loading ? 
                    <>
                        <h2>Displaying {bookState.pagingInformation?.pageCount} books out of {bookState.pagingInformation?.totalCount}</h2>
                        <div className="catalog-search-item-area">
                            {bookState.books.map(book=> <BookCard key={book.barcode} book={book} />)}
                        </div>
                        <div className="catalog-search-pages">
                            <CatalogSearchPageNavigator />
                        </div>
                    </> : 
                    <p>No books found</p>
            }
        </div>
    )
}