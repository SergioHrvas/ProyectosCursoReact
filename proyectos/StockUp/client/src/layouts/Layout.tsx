import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>    
    
    <header className='bg-slate-800'>
      <div className='mx-auto max-w-6xl py-10'>
        <img src="/logo.png" className='w-56'/>
      </div>
    </header>
    <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow-xl'>
      <Outlet/>
    </main>
    </>
  )
}
