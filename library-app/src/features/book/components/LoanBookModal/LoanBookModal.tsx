import React,{ useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice"
import { Modal } from "../../../../components"
import { determineLoanMoadalContent } from "../../utils/BookUtils"

export const LoanBooKModal:React.FC = () => {
    const currentBook = useSelector((state:RootState)=> state.book.currentBook)
    const dispatch:AppDispatch = useDispatch()

    const closeModal = () => {
        dispatch(setDisplayLoan(false))
    }

    return (
        <Modal content={currentBook ? determineLoanMoadalContent(currentBook) : <></>} toggleModal={closeModal} />
    )
}