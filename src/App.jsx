import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import FunCalculator from './pages/FunCalculator'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/fun-calculator" element={<FunCalculator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  ) 
}

export default App