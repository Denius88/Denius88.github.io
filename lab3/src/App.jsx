import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Timeline from './components/Timeline'
import EventsPage from './components/EventsPage'
import Test from './components/Test'
import ProgressChart from './components/ProgressChart'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/progress" element={<ProgressChart />} />
      </Routes>
      <footer>
        <p>© 2026 - Лабораторна робота №3: React Фронтенд-фреймворк (Варіант 15)</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
