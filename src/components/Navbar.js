import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    const toggleMenu = () => setIsOpen(!isOpen);

    const NavLinks = () => (
        <>
            {location.pathname === '/' ? (
                <a href="#why-crossfade" className="text-gray-400 hover:text-white transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Why Crossfade
                </a>
            ) : (
                <Link to="/#why-crossfade" className="text-gray-400 hover:text-white transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Why Crossfade
                </Link>
            )}
            {(!user || user.role === 'client') && (
                <Link to="/client" className="text-gray-400 hover:text-white transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Find Editors
                </Link>
            )}
            {(!user || user.role === 'editor') && (
                <Link to="/editor" className="text-gray-400 hover:text-white transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Find Jobs
                </Link>
            )}
            {user && user.role === 'admin' && (
                <Link to="/admin-dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                </Link>
            )}
        </>
    );

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-[#030014]/50 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)}>
                    <Logo />
                </Link>

                {!isAuthPage && (
                    <>
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            <NavLinks />
                            <div className="h-6 w-[1px] bg-white/10 mx-2" />

                            {user ? (
                                <Link to="/profile" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-xs font-bold font-['Inter']">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <span className="text-sm font-medium">Profile</span>
                                </Link>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to="/login">
                                        <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log In</button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="primary" className="text-sm py-2 px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(112,0,255,0.3)]">
                                            Start Creating
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Menu Drawer */}
            {isOpen && !isAuthPage && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#030014]/95 border-b border-white/5 py-8 px-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-6">
                        <NavLinks />

                        <div className="h-[1px] w-full bg-white/5" />

                        {user ? (
                            <Link to="/profile" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10" onClick={() => setIsOpen(false)}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center font-bold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.role}</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-gray-600" size={20} />
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center border-white/10">Log In</Button>
                                </Link>
                                <Link to="/register" className="w-full" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-primary to-secondary">Start Creating</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
