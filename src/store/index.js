import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../slices/order";
import clinicSlice from "../slices/clinic";
import patientSlice from "../slices/patient";
import authSlice from "../slices/auth";

// export default function configureStoreFunc() {
    const store = configureStore({
        reducer: {
            orders: orderSlice,
            clinics: clinicSlice,
            patients: patientSlice,
            auth: authSlice
        },
    });
    // return { store }
// }

export default store;