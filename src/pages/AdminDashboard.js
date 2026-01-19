import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');

    // Modal states
    const [showUserModal, setShowUserModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editingProject, setEditingProject] = useState(null);

    // Form states
    const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "client", gender: "", dob: "" });
    const [projectForm, setProjectForm] = useState({ title: "", description: "", budget: "", deadline: "", clientId: "" });

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchStats();
            fetchUsers();
            fetchProjects();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/functions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id }),
            });
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id }),
            });
            const data = await res.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id }),
            });
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/admin/create-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id, ...userForm }),
            });
            setShowUserModal(false);
            setUserForm({ name: "", email: "", password: "", role: "client", gender: "", dob: "" });
            fetchUsers();
            fetchStats();
        } catch (error) {
            alert("Error creating user");
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/admin/users/${editingUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id, ...userForm }),
            });
            setEditingUser(null);
            setShowUserModal(false);
            setUserForm({ name: "", email: "", password: "", role: "client", gender: "", dob: "" });
            fetchUsers();
        } catch (error) {
            alert("Error updating user");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await fetch(`${API_URL}/admin/users/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id }),
            });
            fetchUsers();
            fetchStats();
        } catch (error) {
            alert("Error deleting user");
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/admin/create-project`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id, ...projectForm }),
            });
            setShowProjectModal(false);
            setProjectForm({ title: "", description: "", budget: "", deadline: "", clientId: "" });
            fetchProjects();
            fetchStats();
        } catch (error) {
            alert("Error creating project");
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL} / admin / projects / ${editingProject._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id, ...projectForm }),
            });
            setEditingProject(null);
            setShowProjectModal(false);
            setProjectForm({ title: "", description: "", budget: "", deadline: "", clientId: "" });
            fetchProjects();
        } catch (error) {
            alert("Error updating project");
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`${API_URL}/admin/projects/${projectId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: user._id }),
            });
            fetchProjects();
            fetchStats();
        } catch (error) {
            alert("Error deleting project");
        }
    };

    const openEditUser = (u) => {
        setEditingUser(u);
        setUserForm({ name: u.name, email: u.email, password: "", role: u.role, gender: u.gender || "", dob: u.dob || "" });
        setShowUserModal(true);
    };

    const openEditProject = (p) => {
        setEditingProject(p);
        setProjectForm({
            title: p.title,
            description: p.description,
            budget: p.budget,
            deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : "",
            clientId: p.clientId?._id || ""
        });
        setShowProjectModal(true);
    };

    if (!user || user.role !== 'admin') {
        return <div className="text-white text-center pt-20">Access Denied. Admin Only.</div>;
    }

    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto space-y-8">

                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Control Panel</h1>
                        <p className="text-gray-400">Welcome, {user?.name} - You have full system access</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-4 border-b border-white/10">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`px - 6 py - 3 font - medium transition - colors ${activeTab === 'stats' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                                }`}>
                            Statistics
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px - 6 py - 3 font - medium transition - colors ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                                } `}>
                            Users ({users.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`px - 6 py - 3 font - medium transition - colors ${activeTab === 'projects' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                                } `}>
                            Projects ({projects.length})
                        </button>
                    </div>

                    {/* STATISTICS TAB */}
                    {activeTab === 'stats' && stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="p-6 border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
                                <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
                                <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
                                <p className="text-xs text-gray-500 mt-2">Clients: {stats.clients} | Editors: {stats.editors}</p>
                            </Card>
                            <Card className="p-6 border-white/10 bg-gradient-to-br from-green-500/10 to-transparent">
                                <h3 className="text-gray-400 text-sm mb-2">Total Projects</h3>
                                <p className="text-4xl font-bold text-white">{stats.totalProjects}</p>
                                <p className="text-xs text-gray-500 mt-2">Open: {stats.openProjects} | Active: {stats.inProgress}</p>
                            </Card>
                            <Card className="p-6 border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent">
                                <h3 className="text-gray-400 text-sm mb-2">Total Revenue</h3>
                                <p className="text-4xl font-bold text-green-400">${stats.totalRevenue}</p>
                                <p className="text-xs text-gray-500 mt-2">Platform earnings</p>
                            </Card>
                            <Card className="p-6 border-white/10 bg-gradient-to-br from-yellow-500/10 to-transparent">
                                <h3 className="text-gray-400 text-sm mb-2">Completed</h3>
                                <p className="text-4xl font-bold text-white">{stats.completed + stats.paid}</p>
                                <p className="text-xs text-gray-500 mt-2">Paid: {stats.paid}</p>
                            </Card>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <Card className="p-6 border-white/10 bg-black/40">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">User Management</h2>
                                <Button onClick={() => { setEditingUser(null); setUserForm({ name: "", email: "", password: "", role: "client", gender: "", dob: "" }); setShowUserModal(true); }} variant="primary">
                                    Create New User
                                </Button>
                            </div>
                            {loading ? <p className="text-gray-400">Loading...</p> : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="border-b border-white/10">
                                            <tr>
                                                <th className="pb-3 text-gray-400 font-medium">Name</th>
                                                <th className="pb-3 text-gray-400 font-medium">Email</th>
                                                <th className="pb-3 text-gray-400 font-medium">Role</th>
                                                <th className="pb-3 text-gray-400 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u._id} className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="py-4 text-white">{u.name}</td>
                                                    <td className="py-4 text-gray-400">{u.email}</td>
                                                    <td className="py-4">
                                                        <span className={`px - 2 py - 1 rounded text - xs font - bold ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                                            u.role === 'client' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                                                            } `}>{u.role}</span>
                                                    </td>
                                                    <td className="py-4 text-right space-x-2">
                                                        <Button onClick={() => openEditUser(u)} variant="outline" className="text-xs py-1 px-3">Edit</Button>
                                                        <Button onClick={() => handleDeleteUser(u._id)} variant="outline" className="text-xs py-1 px-3 border-red-500/50 text-red-400 hover:bg-red-500/20">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <Card className="p-6 border-white/10 bg-black/40">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Project Management</h2>
                                <Button onClick={() => { setEditingProject(null); setProjectForm({ title: "", description: "", budget: "", deadline: "", clientId: "" }); setShowProjectModal(true); }} variant="primary">
                                    Create New Project
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {projects.map(p => (
                                    <Card key={p._id} className="p-4 border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                                                <p className="text-sm text-gray-400 mt-1">{p.description}</p>
                                                <div className="flex gap-4 mt-3 text-xs text-gray-500">
                                                    <span>Client: {p.clientId?.name || 'Unknown'}</span>
                                                    <span>Budget: ${p.budget}</span>
                                                    <span>Status: {p.status}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button onClick={() => openEditProject(p)} variant="outline" className="text-xs py-1 px-3">Edit</Button>
                                                <Button onClick={() => handleDeleteProject(p._id)} variant="outline" className="text-xs py-1 px-3 border-red-500/50 text-red-400 hover:bg-red-500/20">Delete</Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* USER MODAL */}
                    {showUserModal && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                            <Card className="w-full max-w-md p-6 bg-[#0a0a1a] border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4">{editingUser ? 'Edit User' : 'Create New User'}</h3>
                                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
                                    <Input label="Name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required />
                                    <Input label="Email" type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required />
                                    {!editingUser && <Input label="Password" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required />}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                                        <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                                            <option value="client" className="text-black">Client</option>
                                            <option value="editor" className="text-black">Editor</option>
                                            <option value="admin" className="text-black">Admin</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <Button type="submit" variant="primary" className="flex-1">{editingUser ? 'Update' : 'Create'}</Button>
                                        <Button type="button" onClick={() => { setShowUserModal(false); setEditingUser(null); }} variant="outline" className="flex-1">Cancel</Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    )}

                    {/* PROJECT MODAL */}
                    {showProjectModal && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                            <Card className="w-full max-w-md p-6 bg-[#0a0a1a] border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4">{editingProject ? 'Edit Project' : 'Create New Project'}</h3>
                                <form onSubmit={editingProject ? handleUpdateProject : handleCreateProject} className="space-y-4">
                                    <Input label="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                        <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[100px]" required />
                                    </div>
                                    <Input label="Budget ($)" type="number" value={projectForm.budget} onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })} required />
                                    <Input label="Deadline" type="date" value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} required />
                                    {!editingProject && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
                                            <select value={projectForm.clientId} onChange={(e) => setProjectForm({ ...projectForm, clientId: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" required>
                                                <option value="" className="text-black">Select Client</option>
                                                {users.filter(u => u.role === 'client').map(u => <option key={u._id} value={u._id} className="text-black">{u.name}</option>)}
                                            </select>
                                        </div>
                                    )}
                                    <div className="flex gap-3 mt-6">
                                        <Button type="submit" variant="primary" className="flex-1">{editingProject ? 'Update' : 'Create'}</Button>
                                        <Button type="button" onClick={() => { setShowProjectModal(false); setEditingProject(null); }} variant="outline" className="flex-1">Cancel</Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
}
