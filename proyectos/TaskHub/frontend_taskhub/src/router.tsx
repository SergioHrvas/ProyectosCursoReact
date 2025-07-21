import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/DashboardPage'
import { NewProjectPage } from './pages/projects/NewProjectPage'
import { EditProjectPage } from './pages/projects/EditProjectPage'
import { InfoProjectPage } from './pages/projects/InfoProjectPage'

export default function Router () {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}> {/* Los hijos compartirán el mismo Layout */}
                    <Route path="/" element={<Dashboard />} index/>
                    <Route path="/projects/create" element={<NewProjectPage />} index/>
                    <Route path="/projects/:projectId" element={<InfoProjectPage />} index/>
                    <Route path="/projects/:projectId/edit" element={<EditProjectPage />} index/>

                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}