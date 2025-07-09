import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { FavPages } from './pages/FavPages'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/favourites' element={<FavPages/>}/>
      </Routes>
    </BrowserRouter>
  )
}
