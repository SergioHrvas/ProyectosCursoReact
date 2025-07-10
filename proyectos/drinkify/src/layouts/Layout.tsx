import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import Modal from '../components/Modal'
import { useAppStore } from '../stores/useAppStore'
import { useEffect } from 'react'
import Notification from '../components/Notification'

export const Layout = () => {
  const { loadFromStorage } = useAppStore()

  useEffect(() => loadFromStorage, [])
  return (
    <>
      <Header/>
      <main className='container mx-auto py-10'>
        <Outlet/>
      </main>

      <Modal/>
      <Notification/>
    </>
  )
}
