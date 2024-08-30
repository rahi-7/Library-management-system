import { useDispatch, useSelector } from "react-redux"
import "./RegisterForm.css"
import React, {useEffect, useRef} from "react"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { registerUser, resetRegisterSuccess } from "../../../../redux/slices/AuthenticationSlice"

interface RegisterFormProps {
    toggleLogin():void
}


export const RegisterForm:React.FC<RegisterFormProps> = ({toggleLogin}) => {

    const authState = useSelector((state:RootState)=> state.authentication)
    const dispatch:AppDispatch = useDispatch()

    const firstRef = useRef<HTMLInputElement>(null)
    const lastRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleRegisterUser = async (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (
            firstRef && firstRef.current &&
            lastRef && lastRef.current && 
            emailRef && emailRef.current &&
            passwordRef && passwordRef.current
        ) {
            dispatch(
                registerUser({
                    type: "PATRON",
                    firstName: firstRef.current.value,
                    lastName: lastRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            )
        }
    }

    useEffect(()=>{
        return (()=> {
            dispatch(resetRegisterSuccess())
        })
    },[])

    return (
        <form className="register-form">
            <h5>Enter your information</h5>
            <div className="register-form-name-group">
                <div className="register-form-name-input-group">
                    <h6>first Name</h6>
                    <input className="register-form-input-name" placeholder="firstName" name="first" required ref={firstRef}/>
                </div>
                <div className="register-form-name-input-group">
                    <h6>last Name</h6>
                    <input className="register-form-input-name" placeholder="lastName" name="last" required ref={lastRef}/>
                </div>
            </div>
            <div className="register-form-input-group">
                <h6>Email</h6>
                <input className="register-form-input" type="email" placeholder="email" name="email" required ref={emailRef}></input>
            </div>
            <div className="register-form-input-group">
                <h6>Password</h6>
                <input className="register-form-input" type="password" placeholder="password" name="password" required ref={passwordRef}></input>
            </div>
            <button className="register-form-submit" onClick={handleRegisterUser}>Register</button>
            {authState.registerisSuccess && 
            <p>Registered Successfully.
                <span className="register-form-login" onClick={toggleLogin}>login here</span>
            </p>
            }
            {authState.isError && <p className="register-form-error">There was an error, try a differen email</p>}
        </form>
    )
}