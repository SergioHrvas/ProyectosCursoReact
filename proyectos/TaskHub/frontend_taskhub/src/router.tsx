import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/Dashboard'

export default function Router () {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}> {/* Los hijos compartirán el mismo Layout */}
                    <Route path="/" element={<Dashboard />} index/>
                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}