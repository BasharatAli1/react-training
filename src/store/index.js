import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../slices/order";

// export default function configureStoreFunc() {
    const store = configureStore({
        reducer: {
            orders: orderSlice,
        },
    });
    // return { store }
// }

export default store;