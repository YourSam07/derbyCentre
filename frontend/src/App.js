import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Footer from './components/Footer'

function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  
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
