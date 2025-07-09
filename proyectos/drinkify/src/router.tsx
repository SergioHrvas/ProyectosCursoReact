import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { FavPages } from './pages/FavPages'
import { Layout } from './layouts/Layout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<IndexPage/>} index/>
          <Route path='/favourites' element={<FavPages/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
