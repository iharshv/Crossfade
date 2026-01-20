import { motion } from "framer-motion";


export default function Logo({ className = "", size = 40 }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <motion.img
                src="/assets/full_logo.png"
                alt="Crossfade"
                style={{ height: size, width: 'auto', objectFit: 'contain' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
}
