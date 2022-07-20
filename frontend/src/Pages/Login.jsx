import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginThunk } from '../Redux/authSlice'
import { useNavigate } from "react-router-dom"


const Login = () => {
    const [credential, setCredential] = useState({
        email:"",
        password:""
    });

    const auth = useSelector((store) => store.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/secret");
        }
    }, [auth, navigate])

    //Handle typed value in input 
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredential((prevValue) => ({
            ...prevValue,
            [name]: value,
        }))
    }

  return (
    <div>
        <h1>Login</h1>
        {/* form */}
        {/* username */}
        <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
        />
        {/* username */}
        <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
        />
        <button type='submit' onClick={() => dispatch(loginThunk(credential))}>
            Login
        </button>
    </div>
  )
}

export default Login