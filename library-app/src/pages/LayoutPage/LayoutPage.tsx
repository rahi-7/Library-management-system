import "./LayoutPage.css"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { RootState } from "../../redux/ReduxStore"
import { LibraryCardModal, LoginRegisterModal } from "../../features/authentication"
import { Footer, Navbar } from "../../features/navigation"
import { LoanBooKModal } from "../../features/book"


export default function LayoutPage() {

    const state = useSelector((state:RootState)=> state.modal)

    return (
        <div className="layout-page">
            {state.displayLogin && <LoginRegisterModal/>}
            {state.displayLibraryCard && <LibraryCardModal />}
            {state.displayLoan && <LoanBooKModal />}
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}