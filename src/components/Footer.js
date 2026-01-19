import { Instagram, Mail, Shield, MessageSquare, Heart } from "lucide-react";
import Logo from "./ui/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl mt-auto relative z-10 w-full">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Logo size={32} className="mb-4" />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            The premium marketplace connecting elite video editors with visionary creators. Elevate your content today.
                        </p>
                        <a
                            href="https://www.instagram.com/crossfade.media/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
                        >
                            <Instagram size={20} /> <span className="font-medium">Follow us</span>
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                            <li><a href="/#why-crossfade" className="hover:text-primary transition-colors">Why Crossfade</a></li>
                            <li><Link to="/client" className="hover:text-primary transition-colors">Find Editors</Link></li>
                            <li><Link to="/editor" className="hover:text-primary transition-colors">Find Jobs</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><MessageSquare size={14} /> Feedback</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/terms" className="hover:text-primary transition-colors flex items-center gap-2"><Shield size={14} /> Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Crossfade Media. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        Made with <Heart size={14} className="text-accent fill-accent" /> for creators
                    </div>
                </div>
            </div>
        </footer>
    );
}
