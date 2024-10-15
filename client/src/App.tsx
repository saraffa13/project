import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import AllRoutes from './Routes/AllRoutes'

function App() {
  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  )
}

export default App
