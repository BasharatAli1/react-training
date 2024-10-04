import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./login/Login";
import Home from "./Home";
import OrderList from "./order/listing";
import OrderDetail from './order/details/orderDetail';
import ClinicDetail from './clinic/details/clinicDetail';
import ClinicListing from "./clinic/listing";
import PatientDetail from './patient/details/patientDetail';
import PatientListing from "./patient/listing";
import ProtectedRoute from "./ProtectedRoute";

const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
        <Route 
            path="order" 
            element={
                <ProtectedRoute>
                    <OrderList />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="order/:id" 
            element={
                <ProtectedRoute>
                    <OrderDetail />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="clinic" 
            element={
                <ProtectedRoute>
                    <ClinicListing />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="clinic/:id" 
            element={
                <ProtectedRoute>
                    <ClinicDetail />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="patient" 
            element={
                <ProtectedRoute>
                    <PatientListing />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="patient/:id" 
            element={
                <ProtectedRoute>
                    <PatientDetail />
                </ProtectedRoute>
            } 
        />
        <Route path="login" element={<Login />} />
    </Route>
);
const router = createBrowserRouter(routes);

export default router;