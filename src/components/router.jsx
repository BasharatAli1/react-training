import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Order from "./Order";
import Layout from "./Layout";
import Login from "./Login";
import Clinic from "./Clinic";
import Patient from "./Patient";
import Home from "./Home";


const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="clinic" element={<Clinic />} />
        <Route path="patient" element={<Patient />} />
        {/* <Route path="login" element={<Login />} /> */}
    </Route>
);
const router = createBrowserRouter(routes);

export default router;