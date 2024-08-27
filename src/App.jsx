import './App.css'
import router from './components/router';
import { RouterProvider } from 'react-router-dom';
  
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
  }
  
  export default App