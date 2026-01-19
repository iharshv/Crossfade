import { motion } from "framer-motion";
import logoImg from "../../assets/logo.png";

export default function Logo({ className = "", size = 40 }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative flex items-center justify-center">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-50 animate-pulse" />

                <motion.img
                    src={logoImg}
                    alt="Crossfade Logo"
                    style={{ width: size, height: 'auto', objectFit: 'contain' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-wider text-white leading-none">
                    CROSS<span className="text-primary">FADE</span>
                </h1>
                <span className="text-[10px] tracking-[0.2em] text-secondary/80 font-medium">MEDIA</span>
            </div>
        </div>
    );
}
