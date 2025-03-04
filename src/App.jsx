import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "./assets/component/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import firebase from "./assets/component/Auth/firebase.jsx";
import Contacts from "./assets/component/Contact/Contacts";
import About from "./assets/component/About/About";
import Home from "./assets/component/Home/Home";
import Footer from './assets/component/footer.jsx';
import Page404 from './assets/Error/Page404/Page404.jsx';
import "./App.css";
import Login from "./assets/component/Auth/login";
import SignUp from "./assets/component/Auth/register";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./assets/component/Auth/profile";
import { auth } from "./assets/component/Auth/firebase";
import OnlineTest from "./assets/component/Test/OnlineTest"; // Import the OnlineTest component
import ProctoringDashboard from "./assets/component/Test/ProctoringDashboard"; // Import the ProctoringDashboard component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checking the auth state change on mount
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update the user state when authentication state changes
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  return (
    <Router>
      <AppContent user={user} />
    </Router>
  );
}

function AppContent({ user }) {
  const location = useLocation(); // Access the current route

  // Define routes where Navbar and Footer should not be displayed
  const hideOnRoutes = ["/login", "/register", "/profile"];
  const shouldHideHeaderFooter = hideOnRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {!shouldHideHeaderFooter && <Navbar />}
      
      <br />
      <br />
      
      <Routes>
        {/* Default route: If user is not authenticated, show Login page */}
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/register" element={<SignUp />} />
        
        {/* Profile route: Only accessible if the user is logged in */}
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        
        {/* Other public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Online Test route */}
        <Route path="/online-test" element={user ? <OnlineTest /> : <Navigate to="/login" />} />
        
        {/* Proctoring Dashboard route */}
        <Route path="/proctoring-dashboard" element={user ? <ProctoringDashboard /> : <Navigate to="/login" />} />
        
        <Route path="/contact" element={<Contacts />} />
        
        {/* 404 Page route */}
        <Route path="*" element={<Page404 />} />
      </Routes>

      <ToastContainer />
      
      <br />
      <br />

      {/* Conditionally render Footer */}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;