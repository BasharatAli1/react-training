import React, { useState } from 'react'
import { setAccessToken } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("basharat@camp1.tkxel.com");
    const [password, setPassword] = useState("Tkxel123");
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setError] = useState({
        email: "",
        password: ""
    });
    function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }
    const handleEmailChange = (e) => {
        const emailValue = e.target.value.trim();
        setEmail(e.target.value);
        if(!emailValue) {
            setError({ ...errors, email: "Email is required" });
        } else if(isValidEmail(emailValue)) {
            setError({ ...errors, email: "" });
        } else {
            setError({ ...errors, email: "Email is not correct" });
        }
    }
    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value.trim();
        setPassword(e.target.value);
        if(!passwordValue) {
            setError({ ...errors, password: "Password is required" });
        } else if(passwordValue) {
            setError({ ...errors, password: "" });
        }
    }

    const handleSubmit = () => {
        if(!(errors.email || errors.password)) {
            handleLogin();
        }
    }
    const handleLogin = () => {
        const url = 'http://127.0.0.0:3001/api/auth/login';
        
        const requestBody = {
          deviceToken: '',
          email,
          password,
        };
    
        setAccessToken('');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(result => result.json())
        .then(result => {
            if(result.status === "success") {
                setResponseMessage('Login Successful!');
                handleLoginResponse(true);
                setAccessToken(result.data.access);
                dispatch(setAuth(true));
                navigate('/order');
                return ;
            } else {
                const errMsg = result?.inner?.message?.message || result?.inner?.message || result?.message?.message || result?.message|| result?.name;
                setResponseMessage(`Login Failed: ${errMsg}`);
                handleLoginResponse(false);
                setAccessToken('');
                dispatch(setAuth(false));
                return ;
            }
        })
        .catch(error => {
            handleLoginResponse(false);
            dispatch(setAuth(false));
            setResponseMessage(`Login failed: ${data?.message?.message}`);
        });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginResponse = (flag) => {
        dispatch(setAuth(flag || false));
    }

    return (
        <div className="login-form-container">
            <b> Welcome Back! 👋 </b>
            <p> Sign in to your account </p>
            {responseMessage && <span className="error-message">{responseMessage}</span>}
            <label className="login-label" htmlFor="">
                Email:
                <input
                    type="text"
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={handleEmailChange}
                    className="login-input-field"
                />
            </label>
            {errors.email && <span className="error-message">{errors.email}</span>}
            <label className="login-label" htmlFor="">
                Password:
                <input
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={handlePasswordChange}
                    className="login-input-field"
                />
            </label>
            {errors.password && <span className="error-message">{errors.password}</span>}
            <button onClick={handleSubmit} className="login-submit-button">Submit</button>
        </div>
    );
}

export default Login