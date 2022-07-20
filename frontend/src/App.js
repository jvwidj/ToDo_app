import { useDispatch, useSelector } from "react-redux"
import {Routes, Route, Link} from "react-router-dom"
import { useEffect } from 'react'
import { getTodoList } from "./Redux/TodoSlice";

//Auth
import Login from "./Pages/Login";
import Secret from "./Pages/Secret"
import RequireAuth from "./Components/Auth/RequireAuth";

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

      <Link to="/secret">Secret</Link>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/secret"
          element={
            <RequireAuth redirectTo="/">
              <Secret />
            </RequireAuth>
          }
          />
      </Routes>


    </div>
  );
}

export default App;
