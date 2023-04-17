import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: '', username: null, email:null, eventToPurchase: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.email = action.payload.email
        },
        logout: (state) => {
            state.value.token = '';
            state.value.username = null;
            state.value.email = null 
        },
        addEventToPurchase: (state, action) => {
            state.value.eventToPurchase = action.payload
        }
    },
});

export const { login, logout, addEventToPurchase } = userSlice.actions;
export default userSlice.reducer;
