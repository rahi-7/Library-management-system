import "./profilePage.css"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../redux/ReduxStore"
import { fetchUser } from "../../redux/slices/AuthenticationSlice"
import { ProfileLoanHistory, UpdateUserForm } from "../../features/profile"


export default function ProfilePage() {
    const loggedInUser = useSelector((state:RootState)=> state.authentication.loggedInUser)
    const profileUser = useSelector((state:RootState)=> state.authentication.profileUser)
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()
    const {userId} = useParams()

    useEffect(()=>{
        if (userId) {
            if (loggedInUser?._id === userId || loggedInUser?.type === "EMPLOYEE") {
                dispatch(fetchUser({
                    userId,
                    property:"profileUser"
                }))
            } else {
                navigate("/")
            }
        }
    },[userId])

    return (
        <div className="page">
            <div className="page-container">
                <h1>{profileUser?.firstName} {profileUser?.lastName}'s Profile</h1>
                <div className="profile-page-cols">
                    <div className="profile-page-left-column">
                        <UpdateUserForm />
                    </div>
                    <div className="profile-page-right-column">
                        {profileUser && <ProfileLoanHistory />}
                    </div>
                </div>
            </div>
        </div>
    )
}