import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../Redux/authSlice'
import InputTodo from '../Components/InputTodo'
import ListTodo from '../Components/ListTodo'
import { getTodoList } from '../Redux/TodoSlice'

const Secret = () => {
    
  const {  isLoading } = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList())
  }, [dispatch])

  if(isLoading){
    return (
      <div className="loading text-center my-5">
        <h1>Loading...</h1>
      </div>
    )
  }

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