import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Profile() {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();

    // Local state initialized with user data
    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        gender: user?.gender || "",
        dob: user?.dob || ""
    });

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSave = async () => {
        try {
            // Include _id to identify user
            const response = await fetch(`${API_URL}/auth/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: user._id, ...profile }),
            });
            const data = await response.json();

            if (response.ok) {
                updateUser(data); // Update context/localStorage
                alert("Profile saved successfully!");
            } else {
                alert("Failed to save profile.");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to backend.");
        }
    };

    if (!user) return <div className="text-white text-center pt-20">Please log in to view profile.</div>;

    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">My Profile</h1>
                            <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                        >
                            Log Out
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-[1fr_2fr] gap-8">

                        {/* Sidebar / Avatar */}
                        <div className="space-y-6">
                            <Card className="p-6 border-white/10 bg-black/40 text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-[0_0_30px_rgba(112,0,255,0.3)]">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{user.role}</p>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">

                            {/* Personal Info */}
                            <Card className="p-8 border-white/10 bg-black/40 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                    <Input
                                        label="Email Address"
                                        value={profile.email}
                                        disabled // Usually email is not easily changeable
                                        className="opacity-60 cursor-not-allowed"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                            value={profile.gender}
                                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                        >
                                            <option value="" disabled className="text-black">Select Gender</option>
                                            <option value="male" className="text-black">Male</option>
                                            <option value="female" className="text-black">Female</option>
                                            <option value="other" className="text-black">Other</option>
                                            <option value="n/a" className="text-black">Prefer not to say</option>
                                        </select>
                                    </div>
                                    <Input
                                        label="Date of Birth"
                                        type="date"
                                        value={profile.dob}
                                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button onClick={handleSave} variant="primary" className="bg-white/10 hover:bg-white/20">
                                        Save Changes
                                    </Button>
                                </div>
                            </Card>

                            {/* Settings (Placeholder) */}
                            <Card className="p-8 border-white/10 bg-black/40 backdrop-blur-sm opacity-60">
                                <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
                                <p className="text-gray-400 text-sm">Security, Notifications, and Privacy settings coming soon.</p>
                            </Card>

                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
