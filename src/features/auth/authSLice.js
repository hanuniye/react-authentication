import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {name:'wow'},
    accessToken: '',
    role: ''
}

export const authSLice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setState: (state, action) => {
            const { user, accessToken, role } = action.payload
           return state.user = user;
        }
    }
}
)

export const { setState } = authSLice.actions;
export default authSLice.reducer;
