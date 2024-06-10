import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    })

    const validateName = (name) => {
        if (name.length < 3) {
            return "Name must be at least 3 characters long."
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return "Name can only contain letters and spaces."
        }
        return ""
    }

    // take data from input field and save it in state variable
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setData(data => ({ ...data, [name]: value }))

        // Validation
        let error = ""
        if (name === "name") {
            error = validateName(value)
        }
        setErrors(errors => ({ ...errors, [name]: error }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        if (currState === "Sign Up" && errors.name) {
            toast.error(errors.name)
            return
        }

        let new_url = url
        if (currState === "Login") {
            new_url += "/api/user/login"
        } else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({ token: response.data.token })
            setShowLogin(false)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <>
                            <input
                                name='name'
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                placeholder='Your name'
                                required
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </>
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
