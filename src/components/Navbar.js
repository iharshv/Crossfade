import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./ui/Logo";
import Button from "./ui/Button";

export default function Navbar() {
    const location = useLocation();
    const { user } = useAuth();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-[#030014]/50 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>

                {!isAuthPage && (
                    <div className="flex items-center gap-6">
                        {location.pathname === '/' ? (
                            <a href="#why-crossfade" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Why Crossfade
                            </a>
                        ) : (
                            <Link to="/#why-crossfade" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Why Crossfade
                            </Link>
                        )}
                        {(!user || user.role === 'client') && (
                            <Link to="/client" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Find Editors
                            </Link>
                        )}
                        {(!user || user.role === 'editor') && (
                            <Link to="/editor" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Find Jobs
                            </Link>
                        )}
                        <div className="h-6 w-[1px] bg-white/10 mx-2" />

                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin-dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <Link to="/profile" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-xs font-bold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <span className="text-sm font-medium">Profile</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" className="text-sm py-2 px-5 border-white/10 hover:border-white/30 !bg-transparent">
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="text-sm py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(112,0,255,0.3)]">
                                        Start Creating
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
