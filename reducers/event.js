import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {events: []},
};

export const userSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        addAnEvent: (state, action) => {
            // { event_id: '', eventLiked: [], eventPurchased: [], organiser: [] }    
        },
        logout: (state) => {
            state.value.token = '';
            state.value.username = null;
            state.value.email = null 
        },
    },
});

export const { addAnEvent, logout } = userSlice.actions;
export default userSlice.reducer;
