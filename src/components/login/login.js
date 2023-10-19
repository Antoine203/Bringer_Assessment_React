"use client"

import {React, useState} from "react"
import axios from "axios"
import styles from "../../../public/styles/login.module.css"

export default function LoginView(){
    const [login, setLogin] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [token, setToken] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (login.length == 0){
            setLoginError(true)
        }
        if (password.length == 0){
            setPasswordError(true)
        }
        if (login.length > 0 && password.length > 0){
            axios.post('http://localhost:3000/Generate_Token', {
            login, password
            })
            .then(response => {
                setToken(response.data.token)
                setLogin('')
                setPassword('')
            })
            .catch(error => console.log(error))
        }
    }
    return (
        <div className={`flex justify-center ${styles.container}`}>
            <form onSubmit={handleSubmit} className={`${styles.form}`}>
                <h1 className={`${styles.title}`}>Login</h1>
                <input className={`${loginError? styles.inputError : styles.inputText}`} type="text" placeholder={loginError? "Login Required" :"Login"} value={login} onChange={e => setLogin(e.currentTarget.value)}/>
                <input className={`${passwordError? styles.inputError : styles.inputText}`} type="text" placeholder={passwordError? "Password Required" :"Password"} value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                <button className={`${styles.submit}`} type="submit">Generate Token</button>
                {token && (
                    <div className={`${styles.token_container}`}>
                        <p className={`${styles.text}`}>JWT Token: {token}</p>
                    </div>  
                )}
            </form>
        </div>
    )
}