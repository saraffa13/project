import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Routes/AllRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserName } from './store/slicers/authSlicer';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserName())
  }, [])

  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  );
}

export default App;
