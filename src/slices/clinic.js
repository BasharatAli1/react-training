import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clinicList: [],
};

const clinicSlice = createSlice({
    name: "clinic",
    initialState,
    reducers: {
        setClinicList: (state, action) => {
            state.clinicList = action.payload
        },
    },
});

export const { setClinicList } = clinicSlice.actions;

export default clinicSlice.reducer;