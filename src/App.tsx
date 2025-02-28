import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './commponents/Sidebar'
import MainContent from './commponents/MainContent'
import { ProductPage } from './commponents/ProductPage'

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
