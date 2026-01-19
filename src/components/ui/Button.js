import { motion } from "framer-motion";

export default function Button({ children, onClick, variant = "primary", className = "", ...props }) {
    const baseStyles = "px-6 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2 justify-center transition-all duration-300";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        gradient: "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white",
        outline: "border border-white/20 hover:bg-white/10 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
