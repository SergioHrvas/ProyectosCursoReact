import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

export const MainLayout = () => {
    return (
    <>
        <Outlet/>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
    </>
  )
}
