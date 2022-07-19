import React, { useState} from 'react'
import { useDispatch } from 'react-redux';
import { postItem, } from '../Redux/TodoSlice';


const InputTodo = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("")
  //console.log(description)

  const onSubmitForm = async event => {
    event.preventDefault();
    try { 
      if(description !== ""){
        dispatch(postItem(description))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
    <h1 className='text-center my-5'>Input Todo</h1>
    <form className='d-flex' onSubmit={onSubmitForm}>
        <input type="text" placeholder='add todo' 
              className='form-control' 
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
        <button className='btn btn-success'>Add</button>
    </form>
    </div>
  )
}

export default InputTodo