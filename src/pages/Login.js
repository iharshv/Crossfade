import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth(); // Use global auth definition
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                // Use context login
                login(data);

                // Navigate to home or profile instead of dashboards
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Is the backend running?");
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[80vh] relative">
                {/* Decorative elements behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-primary/10 to-transparent blur-3xl -z-10" />

                <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Welcome Back</h2>
                        <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
                    </div>

                    {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="group-focus-within:border-primary transition-colors"
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <div className="pt-4">
                            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" variant="primary" type="submit">
                                Sign In
                            </Button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account? <Link to="/register" className="text-secondary hover:text-white transition-colors">Sign up</Link>
                    </p>
                </Card>
            </div>
        </Layout>
    );
}