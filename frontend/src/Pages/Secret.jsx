import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '../Redux/authSlice'
import InputTodo from '../Components/InputTodo'
import ListTodo from '../Components/ListTodo'

const Secret = () => {
    const dispatch = useDispatch()

  return (
    <div>
    <h1>You have successfully logged in!</h1>
    <button onClick={() => {dispatch(logoutThunk())}}>Logout</button>
    <InputTodo />
    <ListTodo />
    </div>
  )
}

export default Secret