import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Chat from "../components/Chat";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ClientDashboard() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", budget: "", deadline: "" });
    const [loading, setLoading] = useState(true);
    const [chatProjectId, setChatProjectId] = useState(null);

    const fetchProjects = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/projects/my-projects/${user._id}`);
            const data = await res.json();
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [user?._id]);

    useEffect(() => {
        if (user) fetchProjects();
    }, [user, fetchProjects]);

    const handlePostProject = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, clientId: user._id }),
            });
            setFormData({ title: "", description: "", budget: "", deadline: "" });
            fetchProjects();
            alert("Project posted successfully!");
        } catch (error) {
            alert("Failed to post project");
        }
    };

    const handleHire = async (projectId, editorId) => {
        if (!window.confirm("Are you sure you want to hire this editor?")) return;
        try {
            await fetch(`${API_URL}/projects/${projectId}/assign`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ editorId }),
            });
            fetchProjects();
        } catch (error) {
            alert("Error hiring editor");
        }
    };

    const handleMarkPaid = async (projectId) => {
        try {
            await fetch(`${API_URL}/projects/${projectId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Paid", paymentStatus: "Done" }),
            });
            fetchProjects();
        } catch (error) {
            alert("Error updating status");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto space-y-12">

                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Client Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.name}</p>
                    </div>

                    {/* Post Project Form */}
                    <Card className="p-8 border-white/10 bg-black/40 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-white mb-6">Post a New Project</h2>
                        <form onSubmit={handlePostProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Project Title"
                                placeholder="e.g. 10 Minute Vlog Edit"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <Input
                                label="Budget ($)"
                                placeholder="100"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            />
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors min-h-[100px]"
                                    placeholder="Describe your project requirements..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <Input
                                label="Due Date"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            />
                            <div className="md:col-span-2 flex justify-end mt-2">
                                <Button type="submit" variant="primary" className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                                    Post Project
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Project Lists */}
                    <div>
                        {/* Filter Projects */}
                        {(() => {
                            const activeProjects = projects.filter(p => ['Open', 'In Progress'].includes(p.status));
                            const finishedProjects = projects.filter(p => ['Completed', 'Paid'].includes(p.status));

                            return (
                                <div className="space-y-16">
                                    {/* Section 1: Active Projects */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-6">Active Projects</h2>
                                        {loading ? <p className="text-gray-400">Loading...</p> : activeProjects.length === 0 ? (
                                            <p className="text-gray-500 italic">No active projects.</p>
                                        ) : (
                                            <div className="grid gap-6">
                                                {activeProjects.map((project) => (
                                                    <Card key={project._id} className="p-6 border-white/10 bg-black/20 hover:bg-black/40 transition-colors">
                                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                                                    <span className={`px - 2 py - 1 rounded text - xs font - bold ${project.status === 'Open' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                                                                        }`}>
                                                                        {project.status}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                                                <div className="flex gap-4 text-sm text-gray-500">
                                                                    <span>Budget: ${project.budget}</span>
                                                                    <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>

                                                            <div className="md:w-1/3 border-l border-white/10 md:pl-6 space-y-4">
                                                                {project.status === 'Open' ? (
                                                                    <div>
                                                                        <h4 className="text-sm font-bold text-white mb-3">Applicants ({project.applicants.length})</h4>
                                                                        {project.applicants.length === 0 ? (
                                                                            <p className="text-xs text-gray-500">No applicants yet</p>
                                                                        ) : (
                                                                            <div className="space-y-2 max-h-[150px] overflow-y-auto">
                                                                                {project.applicants.map(app => (
                                                                                    <div key={app._id} className="flex justify-between items-center bg-white/5 p-2 rounded">
                                                                                        <span className="text-xs text-white">{app.name}</span>
                                                                                        <Button
                                                                                            onClick={() => handleHire(project._id, app._id)}
                                                                                            className="text-[10px] py-1 px-2 border-primary text-primary hover:bg-primary hover:text-white"
                                                                                            variant="outline"
                                                                                        >
                                                                                            Hire
                                                                                        </Button>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p className="text-sm text-gray-400 mb-2">Assigned to: <span className="text-white font-bold">{project.assignedTo?.name}</span></p>
                                                                        <div className="space-y-2">
                                                                            <Button
                                                                                onClick={() => setChatProjectId(project._id)}
                                                                                className="w-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/50"
                                                                                variant="outline"
                                                                            >
                                                                                💬 Chat with Editor
                                                                            </Button>
                                                                            <p className="text-xs text-blue-400 bg-blue-500/10 p-2 rounded">Work in progress...</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Section 2: Finished Projects */}
                                    {finishedProjects.length > 0 && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-6 border-t border-white/10 pt-8">Project History</h2>
                                            <div className="grid gap-6">
                                                {finishedProjects.map((project) => (
                                                    <Card key={project._id} className="p-6 border-white/5 bg-black/10 opacity-70 hover:opacity-100 transition-all">
                                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="text-xl font-bold text-gray-300">{project.title}</h3>
                                                                    <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-500">
                                                                        {project.status}
                                                                    </span>
                                                                </div>
                                                                <div className="flex gap-4 text-sm text-gray-500">
                                                                    <span>Budget: ${project.budget}</span>
                                                                    <span>Editor: {project.assignedTo?.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                {project.status === 'Completed' && (
                                                                    <Button
                                                                        onClick={() => handleMarkPaid(project._id)}
                                                                        className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/50"
                                                                        variant="outline"
                                                                    >
                                                                        Mark Payment Done
                                                                    </Button>
                                                                )}
                                                                {project.status === 'Paid' && (
                                                                    <span className="text-green-500 font-bold text-sm border border-green-500/20 px-3 py-1 rounded-full">Payment Complete</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>

                </div>
            </div>

            {/* Chat Modal */}
            {chatProjectId && <Chat projectId={chatProjectId} onClose={() => setChatProjectId(null)} />}
        </Layout>
    );
}