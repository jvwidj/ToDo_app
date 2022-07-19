import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { deleteTodoList } from '../Redux/TodoSlice'

import EditTodo from "./EditTodo"

const ListTodo = () => {
  const {todoList} = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  //const [todos, setTodos] = useState([]);

//Delete todo function
async function deleteTodo(id) {
  try {
    //console.log(`delete ${id}`)
    dispatch(deleteTodoList(id))
  } catch (error) {
    console.log(error.message)
  }
}

 

  if (!todoList) {
    return (
      <h4 className='text-center my-5'>Nothing todo </h4>
    )
  }

  return (
    <div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(todo => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo />
              </td>
              <td>
                <button className='btn btn-danger'
                  onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button></td>
          </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListTodo