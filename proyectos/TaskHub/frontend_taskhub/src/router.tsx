import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/DashboardPage'
import { NewProjectPage } from './pages/projects/NewProjectPage'
import { EditProjectPage } from './pages/projects/EditProjectPage'
import { InfoProjectPage } from './pages/projects/InfoProjectPage'
import { AuthLayout } from './layouts/AuthLayout'
import { LoginPage } from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'

export default function Router () {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}> {/* Los hijos compartirán el mismo Layout */}
                    <Route path="/" element={<Dashboard />} index/>
                    <Route path="/projects/create" element={<NewProjectPage />}/>
                    <Route path="/projects/:projectId" element={<InfoProjectPage />}/>
                    <Route path="/projects/:projectId/edit" element={<EditProjectPage />}/>

                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/auth/register" element={<RegisterPage/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountPage/>}/>
                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}