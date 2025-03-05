import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './commponents/Sidebar'
import { ProductPage } from './commponents/ProductPage'
import CartPage from './commponents/CartPage'
import MainContent from './commponents/MainContent'

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
