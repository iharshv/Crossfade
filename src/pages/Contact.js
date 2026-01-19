import Layout from "../components/Layout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Mail, MapPin, Phone, MessageCircle, HelpCircle } from "lucide-react";

export default function Contact() {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Left Column: Info */}
                    <div>
                        <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-gray-400 mb-12">
                            Have a question about our pricing, features, or need a demo? We're here to help. Chat with our friendly team 24/7.
                        </p>

                        <div className="space-y-8 mb-16">
                            <ContactCard
                                icon={Mail}
                                title="Chat to sales"
                                desc="Speak to our friendly team."
                                info="info@crossfademedia.in"
                                color="text-primary"
                            />
                            <ContactCard
                                icon={HelpCircle}
                                title="Chat to support"
                                desc="We're here to help."
                                info="info@crossfademedia.in"
                                color="text-secondary"
                            />
                            <ContactCard
                                icon={MapPin}
                                title="Visit us"
                                desc="Visit our office HQ."
                                info="100 Smith Street, Melbourne VIC 3000"
                                color="text-accent"
                            />
                        </div>

                        {/* FAQ Snippet */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <details className="bg-white/5 p-4 rounded-xl cursor-pointer group">
                                    <summary className="font-bold list-none flex justify-between items-center text-gray-200">
                                        How much does it cost? <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="mt-3 text-gray-400 text-sm">We have flexible pricing for every budget. Projects usually start around $500 for high-quality editing.</p>
                                </details>
                                <details className="bg-white/5 p-4 rounded-xl cursor-pointer group">
                                    <summary className="font-bold list-none flex justify-between items-center text-gray-200">
                                        What is the average turnaround time? <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="mt-3 text-gray-400 text-sm">Most projects are delivered within 48-72 hours, depending on complexity.</p>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-[#0A0A1B] border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <h2 className="text-2xl font-bold mb-6 relative z-10">Send us a message</h2>
                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-2 gap-6">
                                <Input label="First Name" placeholder="John" />
                                <Input label="Last Name" placeholder="Doe" />
                            </div>
                            <Input label="Email" type="email" placeholder="john@example.com" />
                            <Input label="Phone (Optional)" type="tel" placeholder="+91 1234567890" />

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none h-40"
                                    placeholder="Tell us broadly about your needs..."
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="terms" className="rounded bg-white/10 border-white/20 text-primary focus:ring-primary" />
                                <label htmlFor="terms" className="text-sm text-gray-400">I agree to the <a href="/privacy" className="text-primary underline">Privacy Policy</a>.</label>
                            </div>

                            <Button variant="primary" className="w-full py-4 text-lg bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(112,0,255,0.3)]">
                                Send Message <MessageCircle size={20} className="ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function ContactCard({ icon: Icon, title, desc, info, color }) {
    return (
        <div className="flex items-start gap-4">
            <div className={`p-3 bg-white/5 rounded-xl border border-white/10 ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className="font-bold text-white text-lg">{title}</h3>
                <p className="text-gray-400 text-sm mb-1">{desc}</p>
                <p className="font-bold text-gray-200">{info}</p>
            </div>
        </div>
    )
}
