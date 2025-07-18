import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvider } from './context/activityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ActivityProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ActivityProvider>,
)
