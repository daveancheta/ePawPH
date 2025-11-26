import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/auth/Login.js";
import SignUp from "./pages/auth/SignUp.js";
import { useEffect } from "react";
import { UseAuthStore } from "./store/UseAuthStore.ts"
import { Toaster } from "react-hot-toast"
import Pageloader from "./components/PageLoader.tsx";
import Lost from "./pages/post/Lost.tsx";

function App() {
  const { checkAuth, auth, isCheckingAuth } = UseAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <Pageloader />

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={auth ? <Home /> : <Login />}></Route>
          <Route path='/login' element={auth ? <Home /> : <Login />}></Route>
          <Route path='/signup' element={auth ? <Home /> : <SignUp />}></Route>
          <Route path='/lost' element={auth ? <Lost /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: '#2F2F2F',
            padding: '10px',
            color: '#FFFFFF',
          },
        }}
      />

    </div>
  )
}

export default App