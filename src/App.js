import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomCursor from "./components/CustomCursor";
import InteractiveBackground from "./components/InteractiveBackground";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ClientDashboard from "./pages/ClientDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
        <Route path="/client-dashboard" element={<ProtectedRoute requiredRole="client"><PageTransition><ClientDashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/editor-dashboard" element={<ProtectedRoute requiredRole="editor"><PageTransition><EditorDashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/client" element={<ProtectedRoute requiredRole="client"><PageTransition><ClientDashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute requiredRole="editor"><PageTransition><EditorDashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />

        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><Cookies /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InteractiveBackground />
        <CustomCursor />
        <ScrollToTop />
        <SmoothScroll />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
