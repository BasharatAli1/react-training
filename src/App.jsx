import './App.css'
import router from './components/router';
import Login from './components/Login';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
  
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const handleLoginResponse = (flag) => {
        setLoginSuccess(flag);
    }
    return !loginSuccess ? (
        <>
            <Login handleLoginResponse={handleLoginResponse} />
            <div>FLAG: {!loginSuccess ? 'False': 'True'}</div>
        </>
    ) : (
        <>
            <RouterProvider router={router} />
            <div>FLAG: {!loginSuccess ? 'False': 'True'}</div>
        </>
    )
  }
  
  export default App