import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import App from "../App";
import Layout from "./Layout";
import Login from "./Login";


const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route path="login" element={<Login />} /> */}
    </Route>
);
const router = createBrowserRouter(routes);

export default router;