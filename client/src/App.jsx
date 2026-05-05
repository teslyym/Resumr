import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CVDetails from "./pages/CVDetails";
import CreateCV from "./pages/CreateCV";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cv/:id"
          element={
            <ProtectedRoute>
              <CVDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cv/:id/edit"
          element={
            <ProtectedRoute>
              <CreateCV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateCV />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <AnimatedRoutes />
    </AuthProvider>
  );
}

export default App;
