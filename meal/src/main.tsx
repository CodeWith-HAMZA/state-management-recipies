import { StrictMode } from 'react'
import { Toaster, toast } from 'sonner'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MealsProvider } from './contexts/meals-context.tsx'

createRoot(document.getElementById('root')!).render(
  <MealsProvider>
 
     <App />
  </MealsProvider>
 )
