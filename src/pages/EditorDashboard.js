import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Chat from "../components/Chat";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function EditorDashboard() {
    const { user } = useAuth();
    const [availableProjects, setAvailableProjects] = useState([]);
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatProjectId, setChatProjectId] = useState(null);

    useEffect(() => {
        if (user) {
            fetchAvailableProjects();
            fetchMyProjects();
        }
    }, [user]);

    const fetchAvailableProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`);
            const data = await res.json();
            // Filter out projects I've already applied to
            const filtered = data.filter(p => !p.applicants.includes(user._id));
            setAvailableProjects(filtered);
        } catch (error) {
            console.error("Error fetching available:", error);
        }
    };

    const fetchMyProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects/assigned/${user._id}`);
            const data = await res.json();
            setMyProjects(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching my projects:", error);
        }
    };

    const handleApply = async (projectId) => {
        try {
            await fetch(`${API_URL}/projects/${projectId}/apply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id }),
            });
            alert("Applied successfully!");
            fetchAvailableProjects();
        } catch (error) {
            alert("Error applying");
        }
    };

    const handleFinish = async (projectId) => {
        if (!window.confirm("Mark project as completed?")) return;
        try {
            await fetch(`${API_URL}/projects/${projectId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Completed" }),
            });
            fetchMyProjects();
        } catch (error) {
            alert("Error updating status");
        }
    };

    const getDeadlineAlert = (dateString) => {
        const deadline = new Date(dateString);
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { color: "text-red-500", text: "Overdue!" };
        if (diffDays <= 1) return { color: "text-red-500 animate-pulse font-bold", text: "Due Today/Tomorrow!" };
        if (diffDays <= 3) return { color: "text-yellow-500", text: `Due in ${diffDays} days` };
        return { color: "text-green-500", text: `Due in ${diffDays} days` };
    };

    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto space-y-12">

                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Editor Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.name}</p>
                    </div>

                    {/* Work Lists */}
                    <div>
                        {(() => {
                            const activeWork = myProjects.filter(p => ['Open', 'In Progress'].includes(p.status));
                            const pastWork = myProjects.filter(p => ['Completed', 'Paid'].includes(p.status));

                            return (
                                <div className="space-y-16">
                                    {/* Section 1: Active Work */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Work Queue</h2>
                                        {activeWork.length === 0 ? (
                                            <p className="text-gray-500 italic">No active projects. Apply to some below!</p>
                                        ) : (
                                            <div className="grid gap-6">
                                                {activeWork.map((project) => {
                                                    const alert = getDeadlineAlert(project.deadline);
                                                    return (
                                                        <Card key={project._id} className="p-6 border-white/10 bg-black/20 relative overflow-hidden">
                                                            <div className="absolute top-0 right-0 p-4 bg-white/5 rounded-bl-xl border-b border-l border-white/5">
                                                                <span className={`${alert.color} text-sm`}>{alert.text}</span>
                                                            </div>

                                                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-2">
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                                                    <p className="text-sm text-gray-400 mt-1">Client: {project.clientId?.name}</p>
                                                                    <p className="text-gray-300 mt-4 max-w-2xl">{project.description}</p>
                                                                </div>
                                                                <div className="flex flex-col gap-3 min-w-[150px]">
                                                                    <div className="bg-white/5 p-3 rounded text-center">
                                                                        <span className="block text-xs text-gray-500">Earnings</span>
                                                                        <span className="text-lg font-bold text-green-400">${project.budget}</span>
                                                                    </div>
                                                                    <Button
                                                                        onClick={() => setChatProjectId(project._id)}
                                                                        variant="outline"
                                                                        className="w-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/50"
                                                                    >
                                                                        💬 Chat with Client
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => handleFinish(project._id)}
                                                                        variant="primary"
                                                                        className="w-full bg-blue-600 hover:bg-blue-500"
                                                                    >
                                                                        Mark Finished
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Section 2: Past Work */}
                                    {pastWork.length > 0 && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Completed Projects</h2>
                                            <div className="grid gap-6">
                                                {pastWork.map((project) => (
                                                    <Card key={project._id} className="p-6 border-white/5 bg-black/10 opacity-70">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h3 className="text-xl font-bold text-gray-300">{project.title}</h3>
                                                                <p className="text-sm text-gray-500">Client: {project.clientId?.name}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-green-500 font-mono">${project.budget}</span>
                                                                {project.status === 'Completed' && (
                                                                    <div className="px-3 py-1 rounded border border-yellow-500/30 text-yellow-500 text-sm">
                                                                        Pending Payment
                                                                    </div>
                                                                )}
                                                                {project.status === 'Paid' && (
                                                                    <div className="px-3 py-1 rounded border border-green-500/30 text-green-500 text-sm font-bold">
                                                                        Paid
                                                                    </div>
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

                    {/* Find New Jobs */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 mt-12 border-b border-white/10 pb-4">Find New Jobs</h2>
                        {loading ? <p>Loading...</p> : availableProjects.length === 0 ? (
                            <p className="text-gray-500">No new jobs available right now.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableProjects.map((project) => (
                                    <Card key={project._id} className="p-6 border-white/10 bg-black/40 hover:border-primary/50 transition-all flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                                            <div className="flex justify-between items-center text-sm mb-4">
                                                <span className="text-green-400">${project.budget}</span>
                                                <span className="text-gray-500">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => handleApply(project._id)}
                                            variant="outline"
                                            className="w-full border-white/10 hover:bg-white/10"
                                        >
                                            Apply Now
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Chat Modal */}
            {chatProjectId && <Chat projectId={chatProjectId} onClose={() => setChatProjectId(null)} />}
        </Layout>
    );
}