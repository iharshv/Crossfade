export default function Input({ label, type = "text", value, onChange, placeholder, className = "" }) {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-gray-300 text-sm mb-2">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
        </div>
    );
}
