import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
    
    </>
  );
}

export default App;
