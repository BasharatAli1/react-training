import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.js'
// import configureStoreFunc from '../src/store/index.js'
// const { store } = configureStoreFunc();

createRoot(document.getElementById('root')).render(
//   <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
//   </StrictMode>,
)
