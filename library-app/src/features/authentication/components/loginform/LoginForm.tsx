import React, {useRef} from "react";
import "./LoginForm.css"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { loginUser } from "../../../../redux/slices/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";


interface loginFormProps {
    toggleRegister():void
}

export const LoginForm:React.FC<loginFormProps> = ({toggleRegister}) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const auth = useSelector((state:RootState)=> state.authentication)
    const dispatch:AppDispatch = useDispatch()


    const handleLoginUser = async (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(emailRef.current && passwordRef.current) {
            dispatch(loginUser({
                email: emailRef.current.value,
                password: passwordRef.current.value
            }))
        }
    }

    return (
        <form className="login-form">
            <h2>Please Login</h2>
            <div className="login-form-input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="login-form-input" placeholder="your email" required ref={emailRef}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="login-form-input" placeholder="your password" required ref={passwordRef}/>
                <button className="login-form-submit" onClick={handleLoginUser}>Login</button>
            </div>
            {auth.isError && <p className="login-form-error">Invalid email or password</p>}

            <p>
                Don't have an account? <span className="login-form-register" onClick={toggleRegister}>Create one here</span>
            </p>
        </form>
    )
}