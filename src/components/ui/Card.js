import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl text-white ${className}`}
        >
            {children}
        </motion.div>
    );
}
