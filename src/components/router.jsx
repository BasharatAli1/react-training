import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Home from "./Home";
import OrderList from "./order/listing";
import OrderDetail from './order/details';
import ClinicDetail from './clinic/details';
import ClinicListing from "./clinic/listing";
import PatientDetail from './patient/details';
import PatientListing from "./patient/listing";


const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="order" element={<OrderList />} />
        <Route path="order/:id" element={<OrderDetail />} />
        <Route path="clinic" element={<ClinicListing />} />
        <Route path="clinic/:id" element={<ClinicDetail />} />
        <Route path="patient" element={<PatientListing />} />
        <Route path="patient/:id" element={<PatientDetail />} />
        {/* <Route path="login" element={<Login />} /> */}
    </Route>
);
const router = createBrowserRouter(routes);

export default router;