import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, CheckCircle, LayoutDashboard, Zap, Shield, Users, Star } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-5xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now connecting top 1% editors with creators
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-primary animate-pulse-slow">
              Visual Stories
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            The premium marketplace for creators who refuse to compromise.
            <span className="text-white font-medium"> Connect, collaborate, and create</span> masterpieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <Link to="/register">
              <Button variant="primary" className="px-10 py-4 text-lg font-bold shadow-[0_0_40px_rgba(112,0,255,0.4)] hover:shadow-[0_0_60px_rgba(112,0,255,0.6)]">
                Get Started <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="px-10 py-4 text-lg font-semibold border-white/10 hover:bg-white/5">
                View Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Why Crossfade Section */}
      <section id="why-crossfade" className="py-20 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why <span className="text-primary">Crossfade</span>?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We're not just another freelance platform. We're a curated ecosystem for high-end video production.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full text-left">
          {[
            { icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10", title: "Lightning Fast", desc: "Optimized file transfer protocols and streamlined review tools cut turnaround times in half." },
            { icon: Shield, color: "text-green-400", bg: "bg-green-400/10", title: "Secure Payments", desc: "Funds are held in escrow until you are 100% satisfied with the final cut." },
            { icon: Users, color: "text-pink-400", bg: "bg-pink-400/10", title: "Elite Talent", desc: "We accept less than 1% of applicants. Work only with the industry's best minds." },
            { icon: Play, color: "text-secondary", bg: "bg-secondary/10", title: "Seamless Workflow", desc: "Automated file transfers and review cycles that keep you in the flow." },
            { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", title: "Vetted Professionals", desc: "Every editor is hand-picked and verified for quality and reliability." },
            { icon: LayoutDashboard, color: "text-accent", bg: "bg-accent/10", title: "Project Management", desc: "Track progress, payments, and revisions all in one premium dashboard." }
          ].map((feature, idx) => (
            <Card key={idx} className="group hover:bg-[#0A0A1B] transition-all duration-300 border-white/5 hover:border-primary/20 hover:-translate-y-2">
              <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 w-full border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400">From raw footage to masterpiece in 3 simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          {[
            { step: "01", title: "Post a Project", desc: "Share your vision, budget, and raw files securely." },
            { step: "02", title: "Collaborate", desc: "Connect with matched editors and review drafts in real-time." },
            { step: "03", title: "Download", desc: "Approve the final cut and download high-res masters." }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 bg-[#030014] p-6 rounded-2xl border border-white/5 text-center hover:border-primary/50 transition-colors">
              <div className="text-6xl font-black text-white/5 mb-4">{item.step}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 w-full border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-gray-400">See what the community is saying about Crossfade.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Sarah Jenkins", role: "YouTuber (1.2M Subs)", text: "Crossfade completely changed my workflow. The quality of editors here is unmatched." },
            { name: "Marcus Chen", role: "Indie Filmmaker", text: "Finally a platform that understands valid color grading and sound design. Worth every penny." },
            { name: "Elena Rodriguez", role: "Marketing Director", text: "We scaled our video output by 300% without hiring a full-time in-house team. Amazing." }
          ].map((review, idx) => (
            <Card key={idx} className="border-white/5 bg-[#0A0A1B]/50">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                <div className="text-left">
                  <div className="font-bold text-white text-sm">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center w-full flex justify-center">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-1 rounded-3xl inline-block max-w-4xl w-full mx-4">
          <div className="bg-[#030014] rounded-[22px] p-12 md:p-20 border border-white/10 backdrop-blur-xl flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to create?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of creators and editors building the future of digital content.</p>
            <Link to="/register">
              <Button variant="primary" className="px-12 py-5 text-xl font-bold shadow-[0_0_50px_rgba(112,0,255,0.5)]">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
