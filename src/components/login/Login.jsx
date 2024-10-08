import React, { useState } from 'react'
import { setAccessToken, setRefreshToken } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { API } from '../../axios';

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
    const handleLogin = async () => {
        try {
            const requestBody = {
              deviceToken: '',
              email,
              password,
            };
        
            setAccessToken('');
            setRefreshToken('');
            const result = await API.post(
                '/auth/login',
                requestBody
            );
            console.log('result.data.data.refresh ::', result.data.data.refresh);

            if(result.data.status === "success") {
                setResponseMessage('Login Successful!');
                handleLoginResponse(true);
                setAccessToken(result.data.data.access);
                setRefreshToken(result.data.data.refresh);
                dispatch(setAuth(true));
                navigate('/order');
                return ;
            } else {
                const errMsg = result?.inner?.message?.message || result?.inner?.message || result?.message?.message || result?.message|| result?.name;
                setResponseMessage(`Login Failed: ${errMsg}`);
                handleLoginResponse(false);
                setAccessToken('');
                setRefreshToken('');
                dispatch(setAuth(false));
                return ;
            }

        } catch (err) {
            console.log('Login Err :::', err);
            handleLoginResponse(false);
            dispatch(setAuth(false));
            setResponseMessage(`Login Failed: ${err.response.data?.message}`);
        }
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