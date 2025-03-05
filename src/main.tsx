import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FilterProvider } from './commponents/FilterContext.tsx'
import { CartProvider } from './commponents/CartContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </FilterProvider>
  </StrictMode>
)
