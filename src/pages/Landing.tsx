import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import AnimatedCard from '../components/ui/AnimatedCard';
import FadeIn from '../components/ui/FadeIn';
import { Rocket, Brain, Code, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto border-b border-slate-800"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Rocket className="text-indigo-500 w-6 h-6" />
          </motion.div>
          <span className="text-xl font-bold">ProjectPilot AI</span>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">Login</Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20 max-w-4xl mx-auto">
        {/* Hero heading */}
        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Turn Your Skills Into a Standout Final-Year Project.
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.25}>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl">
            Discover practical project ideas tailored to your domain, get a complete roadmap, and receive AI-powered mentorship to guide your development.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex gap-4">
            <Link to="/generator">
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }} whileTap={{ scale: 0.95 }} className="rounded-md">
                <Button className="text-lg px-8 py-4">Generate My Project Idea</Button>
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" className="text-lg px-8 py-4">Explore Examples</Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 w-full">
          <FadeIn delay={0.1}>
            <AnimatedCard className="h-full">
              <div className="p-6">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Brain className="w-10 h-10 text-indigo-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Smart Generation</h3>
                <p className="text-slate-400">Ideas based on your exact skills and timeline.</p>
              </div>
            </AnimatedCard>
          </FadeIn>

          <FadeIn delay={0.2}>
            <AnimatedCard className="h-full">
              <div className="p-6">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Code className="w-10 h-10 text-emerald-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Tech Stack Advice</h3>
                <p className="text-slate-400">Modern tools recommended for your requirements.</p>
              </div>
            </AnimatedCard>
          </FadeIn>

          <FadeIn delay={0.3}>
            <AnimatedCard className="h-full">
              <div className="p-6">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <CheckCircle className="w-10 h-10 text-purple-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Structured Roadmap</h3>
                <p className="text-slate-400">Week-by-week guide to ensure completion.</p>
              </div>
            </AnimatedCard>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
