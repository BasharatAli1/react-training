import React, { useState } from 'react'
import { setAccessToken } from '../utils/helper';

const Login = (props) => {
    const [email, setEmail] = useState("basharat@camp1.tkxel.com");
    const [password, setPassword] = useState("Tkxel123");
    const [deviceToken, setDeviceToken] = useState('');
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
          deviceToken,
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
            redirect: 'follow'
        })
        .then(result => result.json())
        .then(result => {
            if(result.status === "success") {
                setResponseMessage('Login successful');
                props.handleLoginResponse(true);
                setAccessToken(result.data.access);
                // handle success (e.g., save token, redirect, etc.)
                return ;
            }
        })
        .catch(error => {
            setResponseMessage(`Error: ${error.message}`);
            props.handleLoginResponse(false);
            setResponseMessage(`Login failed: ${data.message.message}`);
        });
    };

    return (
        <>
            {responseMessage && <span style={{ color:"red" }}>{responseMessage}</span>}
            <br />
            <label htmlFor="">
                Email:
                <input type='text' value={email} placeholder='Enter Email Address' onChange={handleEmailChange}/>
            </label>
            <br />
            {errors.email && <span style={{ color:"red" }}>{errors.email}</span>}
            <br />
            <label htmlFor="">
                Password:
                <input type='text' value={password} placeholder='Enter Password' onChange={handlePasswordChange}/>
            </label>
            <br />
            {errors.password && <span style={{ color:"red" }}>{errors.password}</span>}
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Login