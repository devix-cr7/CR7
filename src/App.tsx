import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Landing } from './pages/Landing'
import { DoctorSearch } from './pages/DoctorSearch'
import { DoctorProfile } from './pages/DoctorProfile'
import { Auth } from './pages/Auth'
import { ForDoctors } from './pages/ForDoctors'

function App() {
  return (
    <BrowserRouter basename="/tabib">
      <div dir="rtl" className="min-h-screen bg-[var(--color-ink)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<DoctorSearch />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/for-doctors" element={<ForDoctors />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
