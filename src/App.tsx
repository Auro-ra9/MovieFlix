import Home from './pages/Home/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { Toaster } from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
const App = () => {
  const navigate= useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged In")
        navigate('/')
      }else{
        console.log("Logged Out")
        navigate('/login')

      }
    })
  },[])
  return (
    <div>
 <Toaster
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App