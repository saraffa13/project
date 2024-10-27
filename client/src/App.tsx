import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Routes/AllRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkLanguage, checkUserName, getKeyWords, getNotification, getUsers } from './store/slicers/authSlicer';
import { fetchCart, fetchOrders } from './store/slicers/cartSlicer';
import { fetchMedicines } from './store/slicers/medicineSlicer';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserName())
    dispatch(getNotification())
    dispatch(getKeyWords())
    dispatch(checkLanguage())
    dispatch(fetchMedicines())
    dispatch(fetchCart())
    dispatch(getUsers())
    dispatch(fetchOrders())
  }, [])
  
 
  return (
    <>
      <ToastContainer draggable />
      <AllRoutes />
    </>
  );
}

export default App;