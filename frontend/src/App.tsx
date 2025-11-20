import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./layout/Home";
import Login from "./layout/auth/Login";
import SignUp from "./layout/auth/SignUp";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 realtive flex items-center justify-center p-4 overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App