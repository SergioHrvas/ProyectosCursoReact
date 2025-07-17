import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { NewProjectView } from './pages/projects/NewProjectView'

export default function Router () {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}> {/* Los hijos compartirán el mismo Layout */}
                    <Route path="/" element={<Dashboard />} index/>
                    <Route path="/projects/create" element={<NewProjectView />} index/>

                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}