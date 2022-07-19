import InputTodo from "./Components/InputTodo";
import ListTodo from './Components/ListTodo';

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getTodoList } from "./Redux/TodoSlice";

function App() {
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
    <div className="App container">
      <InputTodo />
      <ListTodo />
    </div>
  );
}

export default App;
