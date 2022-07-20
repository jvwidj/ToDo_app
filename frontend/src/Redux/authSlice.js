import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "Auth",
    initialState: {
        isAuthenticated: false || localStorage.getItem("TOKEN") != null,
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state)=> {
            state.isAuthenticated = false;
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

//LOGIN THUNK
export const loginThunk = 
    ({username, password}) => 
    async (disptach) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/login`,
        {username,
        password,});
        console.log("response", res);

        if(res.data){
            localStorage.setItem("TOKEN", res.data.token);
            disptach(login());
        }
    }

//LOGOUT THUNK
export const logoutThunk = () => (dispatch) => {
    localStorage.removeItem("TOKEN");
    dispatch(logout());
}