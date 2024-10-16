import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Routes/AllRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserName } from './store/slicers/authSlicer';
import { fetchCart } from './store/slicers/cartSlicer';
import { fetchMedicines } from './store/slicers/medicineSlicer';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserName())
    dispatch(fetchMedicines())
    dispatch(fetchCart())
  }, [])

  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  );
}

export default App;
