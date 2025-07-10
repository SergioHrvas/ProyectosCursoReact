import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './layouts/Layout'

//import { FavPages } from './pages/FavPages'
const FavPages = lazy(() => import('./pages/FavPages'))

//import { IndexPage } from './pages/IndexPage'
const IndexPage = lazy(() => import('./pages/IndexPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={
            <Suspense fallback="Cargando...">
              <IndexPage/>
            </Suspense>} index/>
          {/*<Route path='/favourites' element={<FavPages/>}/>*/}
          <Route path='/favourites' element={
            <Suspense fallback="Cargando...">
              <FavPages/>
            </Suspense>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
