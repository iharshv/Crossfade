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

            <motion.img
                src="/assets/text_logo.png"
                alt="Crossfade"
                style={{ height: size * 0.8, width: 'auto', objectFit: 'contain' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            />
        </div>
    );
}
