import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/auth/Login.js";
import SignUp from "./pages/auth/SignUp.js";
import { useEffect } from "react";
import { UseAuthStore } from "./store/UseAuthStore.ts"
import { Toaster } from "react-hot-toast"
import PageLoader from "./components/Pageloader";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = UseAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Login />}></Route>
          <Route path='/login' element={authUser ? <Home /> : <Login />}></Route>
          <Route path='/signup' element={authUser ? <Home /> : <SignUp />}></Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  )
}

export default App