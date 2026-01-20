import Layout from "../components/Layout";
import { Users, Globe, Award, MonitorPlay } from "lucide-react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-12 px-6">
                {/* Intro */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Revolutionizing Video Production
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Crossfade isn't just a platform; it's a movement. We are bridging the gap between visionary creators and elite editing talent, democratizing access to cinema-quality video production.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {[
                        { label: "Community", value: "50+", icon: Users, color: "text-primary" },
                        { label: "Projects Done", value: "2k+", icon: MonitorPlay, color: "text-secondary" },
                        { label: "Countries", value: "5+", icon: Globe, color: "text-accent" },
                        { label: "Satisfaction", value: "99%", icon: Award, color: "text-yellow-400" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center hover:border-primary/30 transition-colors">
                            <stat.icon size={32} className={`${stat.color} mx-auto mb-4`} />
                            <h3 className="text-4xl font-bold mb-2 text-white">{stat.value}</h3>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Story */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
                        <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Founded in 2024 by a team of filmmakers and tech veterans, Crossfade emerged from a shared frustration: the video production workflow was broken. Email chains, massive file transfers that failed at 99%, and missed deadlines were the norm.
                            </p>
                            <p>
                                We set out to build the "operating system" for video creation. A place where file transfers are instant, collaboration is real-time, and payments are secure.
                            </p>
                            <p className="text-white font-medium">
                                Today, we are the go-to home for the world's most ambitious YouTubers, agencies, and brands.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-2xl opacity-20"></div>
                        <div className="relative bg-[#0A0A1B] p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Values We Live By</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Quality Over Quantity", desc: "We are an invite-only platform for editors. Top 1% only." },
                                    { title: "Radical Transparency", desc: "No hidden fees. Full visibility into project progress." },
                                    { title: "Creator First", desc: "Every feature we build is designed to save you time." }
                                ].map((val, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1"><CheckIcon /></div>
                                        <div>
                                            <h4 className="font-bold text-white">{val.title}</h4>
                                            <p className="text-sm text-gray-400">{val.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Leadership</h2>
                        <p className="text-gray-400">The visionaries behind Crossfade Media</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {[
                            { name: "Harsh", role: "Founder", ig: "@iharshv", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
                            { name: "Name", role: "Co-Founder", ig: "@handle", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
                            { name: "Name", role: "Advisor", ig: "@handle", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" }
                        ].map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="group relative w-full max-w-[320px] bg-black/40 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(112,0,255,0.15)]"
                            >
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Image Container */}
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6 relative text-center">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{member.name}</h3>
                                    <p className="text-gray-400 font-medium mb-4">{member.role}</p>

                                    <a
                                        href={`https://instagram.com/${member.ig.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 rounded-full text-sm text-gray-300 hover:text-white border border-white/10 hover:border-primary/30 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        <span>{member.ig}</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-b from-white/5 to-transparent p-12 rounded-3xl border border-white/5">
                    <h2 className="text-3xl font-bold mb-6">Want to be part of the journey?</h2>
                    <div className="flex justify-center gap-4">
                        <Link to="/careers">
                            <Button variant="primary">View Open Roles</Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline">Contact Press</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function CheckIcon() {
    return (
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    )
}
