import { Outlet } from "react-router-dom"

export const AppLayout = () => {
  return (
    <>
        <h1 className='text-6xl'>TaskHub</h1>
        <Outlet/>
    </>
  )
}
