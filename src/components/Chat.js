import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import Card from "./ui/Card";
import Button from "./ui/Button";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const socket = io(API_URL);

export default function Chat({ projectId, onClose }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/chat/${projectId}?userId=${user._id}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();

        // Join the project room
        socket.emit("join_project", projectId);

        // Listen for new messages
        socket.on("receive_message", (data) => {
            if (data.projectId === projectId) {
                setMessages((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.off("receive_message");
        };
    }, [projectId, user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            projectId,
            sender: user._id,
            senderName: user.name,
            senderRole: user.role,
            message: newMessage,
            timestamp: new Date()
        };

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId,
                    userId: user._id,
                    message: newMessage
                })
            });

            if (res.ok) {
                // Emit to socket
                socket.emit("send_message", messageData);
                setNewMessage("");
            }
        } catch (error) {
            alert("Error sending message");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl h-[600px] bg-[#0a0a1a] border-white/10 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white">Project Chat</h3>
                    <Button onClick={onClose} variant="outline" className="text-xs py-1 px-3">Close</Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {loading ? (
                        <p className="text-gray-400 text-center">Loading messages...</p>
                    ) : messages.length === 0 ? (
                        <p className="text-gray-500 text-center italic">No messages yet. Start the conversation!</p>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === user._id
                                    ? 'bg-primary/20 text-white'
                                    : 'bg-white/5 text-gray-200'
                                    }`}>
                                    <p className="text-xs font-bold mb-1 text-gray-400">
                                        {msg.senderName} <span className="text-[10px]">({msg.senderRole})</span>
                                    </p>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                    />
                    <Button type="submit" variant="primary" className="px-6">Send</Button>
                </form>
            </Card>
        </div>
    );
}
