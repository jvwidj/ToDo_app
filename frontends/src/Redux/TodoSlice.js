import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

//URL Data
const api = `${process.env.REACT_APP_BACKEND}/api/todo`

const initialState = {
    todoList : [],
    isLoading:true,
}

//Post item
export const postItem = createAsyncThunk(
    'todo/postItem',
    async (description) => {
        try {
            const res = await axios.post(api, {description:`${description}`})
            //console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error.message)
        }
    }
)

//Get todo items
//create async thunk
export const getTodoList = createAsyncThunk(
    'todo/getTodoList',
    async () => {
        try {
            const res = await axios.get(api);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
)



//Delete todo item
export const deleteTodoList = createAsyncThunk(
    'todo/deleteTodo',
    async (id) => {
        try {
            const res = await axios.delete(`${api}/${id}`)
            //console.log(res)
            return res.data;
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getTodoList.pending]: (state) => {
            state.isLoading = true
        },
        [getTodoList.fulfilled]: (state, action) => {
            //console.log(action)
            state.isLoading = false
            state.todoList = action.payload
        },
        [getTodoList.rejected]: (state) => {
            state.isLoading = false
        },
        [postItem.fulfilled]: (state, action) => {
            //console.log(action)
            state.isLoading = false
            state.todoList = action.payload
        },
        [deleteTodoList.fulfilled]: (state, action) => {
            //console.log(action)
            state.isLoading = false
            state.todoList = action.payload
        },
    }
})


export default todoSlice.reducer;