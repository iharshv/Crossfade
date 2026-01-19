import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import { Briefcase, Heart, Coffee, Laptop, Clock, Smile, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Careers() {
    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-12 px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                        <Briefcase size={16} /> We are Hiring!
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">Build the Future of <br /><span className="text-primary">Creativity</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We're a remote-first team of dreamers and doers. We're solving complex problems for the world's most creative people.
                    </p>
                </div>

                {/* Benefits */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 text-center">Why join Crossfade?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Laptop, title: "Remote First", desc: "Work from anywhere in the world. We focus on output, not hours." },
                            { icon: Heart, title: "Full Healthcare", desc: "Comprehensive medical, dental, and vision coverage for you and your family." },
                            { icon: Coffee, title: "Learning Budget", desc: "$1,000/year to spend on courses, books, or conferences." },
                            { icon: Clock, title: "Flexible Schedule", desc: "You manage your own time. We respect work-life balance." },
                            { icon: Smile, title: "Team Retreats", desc: "Twice a year we fly the whole team to an awesome location." },
                            { icon: TrendingUp, title: "Equity Options", desc: "Be an owner. Everyone gets stock options in the company." }
                        ].map((benefit, i) => (
                            <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 transition-colors">
                                <benefit.icon className="text-secondary w-8 h-8 mb-4" />
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Open Roles */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", loc: "Remote (Global)" },
                            { title: "Senior Backend Engineer", dept: "Engineering", type: "Full-time", loc: "Remote (RU/IN)" },
                            { title: "Product Designer", dept: "Design", type: "Full-time", loc: "Remote (US/IN)" },
                            { title: "Head of Marketing", dept: "Growth", type: "Full-time", loc: "Remote (UK/IN)" },
                            { title: "Customer Success Lead", dept: "Operations", type: "Full-time", loc: "Remote (Global)" },
                        ].map((job, idx) => (
                            <div key={idx} className="group flex flex-col md:flex-row items-center justify-between bg-[#0A0A1B] border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all cursor-pointer">
                                <div className="mb-4 md:mb-0 w-full md:w-auto">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span className="bg-white/5 px-2 py-1 rounded">{job.dept}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                                        <span className="flex items-center gap-1"><Globe size={12} /> {job.loc}</span>
                                    </div>
                                </div>
                                <Link to="/contact">
                                    <Button variant="outline" className="w-full md:w-auto border-white/20 hover:border-primary hover:text-primary group-hover:bg-primary/10">
                                        Apply
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12 text-gray-500">
                        Don't see your role? <a href="./contact" className="text-primary hover:underline">Email us</a> your resume.
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function TrendingUp(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
}
