import { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "client" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Account created successfully! Please log in.");
                navigate("/login");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Is the backend running?");
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[80vh] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-secondary/10 to-transparent blur-3xl -z-10" />

                <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                        <p className="text-gray-400 mt-2">Join the elite community of creators</p>
                    </div>

                    {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <div className="space-y-3 pt-2">
                            <label className="block text-gray-300 text-sm font-medium">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${formData.role === 'client' ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_20px_rgba(0,194,255,0.2)]' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    Client
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'editor' })}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${formData.role === 'editor' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(112,0,255,0.2)]' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    Editor
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90" variant="primary" type="submit">
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account? <Link to="/login" className="text-primary hover:text-white transition-colors">Log in</Link>
                    </p>
                </Card>
            </div>
        </Layout>
    );
}