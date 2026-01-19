import Layout from "../components/Layout";
import { Users, Zap, Globe, Award, TrendingUp, MonitorPlay } from "lucide-react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

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
