import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './components/router';
  
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

function App() {
    return(
        <>
            <RouterProvider router={router} />;
        </>
    )
  }
  
  export default App