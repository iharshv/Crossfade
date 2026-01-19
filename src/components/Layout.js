import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen w-full bg-[#030014] text-white relative overflow-x-hidden flex flex-col">
            {/* Advanced Animated Background */}
            <div className="fixed inset-0 z-0 select-none pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* Animated Globs */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-28 px-4 pb-12 min-h-screen flex flex-col max-w-[1400px] mx-auto w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
