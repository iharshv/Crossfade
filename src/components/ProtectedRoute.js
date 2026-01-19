import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a spinner

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check for specific role if required
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}
