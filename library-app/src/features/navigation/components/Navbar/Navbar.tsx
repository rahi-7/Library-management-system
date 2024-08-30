import "./Navbar.css"
import React, {useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice"
import { Book, Search } from "@mui/icons-material"

export const Navbar:React.FC = () => {

    const searchRef = useRef<HTMLInputElement>(null)
    const authState = useSelector((state:RootState)=> state.authentication)
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()

    const handleEnterkey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchRef && searchRef.current && searchRef.current.value.length > 0) {
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`)
            searchRef.current.value = ""
        }
    }

    const handleSearchIconClicked = () => {
        if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`)
            searchRef.current.value = ""
        }
    }

    const navigateToProfile = () => {
        if(authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`)
    }

    const toggleLogin = () => {
        dispatch(setDisplayLogin(true))
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo-section">
                <Book sx={{fontSize:"3rem"}}/>
                <h3>My Library</h3>
            </Link>
            <div className="navbar-option-section">
                <Link to="/catalog" className="navbar-option navbar-link">
                    <h4>View Catalog</h4>
                </Link>
                <div className="navbar-search-box">
                    <input className="navbar-search-input" placeholder="Search Catalog" onKeyDown={handleEnterkey} ref={searchRef}/>
                    <Search onClick={handleSearchIconClicked} sx={{fontSize:"2rem", cursor: "pointer"}}/>
                </div>
                {
                    authState.loggedInUser ?
                        <div className="navbar-option" onClick={navigateToProfile}>
                            <h4>{authState.loggedInUser.firstName}'s account</h4>
                        </div>
                        :
                        <div className="navbar-option" onClick={toggleLogin}>
                            <h4>Login</h4>
                        </div>
                }
            </div>
        </nav>
    )
}