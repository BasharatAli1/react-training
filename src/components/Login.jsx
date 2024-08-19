import React, { useState } from 'react'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    const handleLogin = async () => {
        const url = 'http://127.0.0.0:3001/api/auth/login';
        
        const requestBody = {
          deviceToken,
          email,
          password,
        };
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
        
            const data = await response.json();
        
            if (response.ok) {
                setResponseMessage('Login successful');
                props.handleLoginResponse(true)
                // handle success (e.g., save token, redirect, etc.)
            } else {
                props.handleLoginResponse(false)
                setResponseMessage(`Login failed: ${data.message.message}`);
                console.log('Login Message:', data.message.message);
                // handle error
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
            // handle network error
        }
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