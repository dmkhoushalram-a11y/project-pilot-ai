import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import AnimatedCard from '../components/ui/AnimatedCard';
import FadeIn from '../components/ui/FadeIn';
import { User, Bookmark } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800"
      >
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">Back to Home</Button>
          </motion.div>
        </Link>
      </motion.header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <FadeIn delay={0.1}>
            <AnimatedCard>
              <div className="p-6">
                <motion.div
                  className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-indigo-400"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <User size={32} />
                </motion.div>
                <h2 className="text-xl font-bold">Student Profile</h2>
                <p className="text-slate-400 mt-2">Domain: Computer Science</p>
                <p className="text-slate-400">Skills: React, Node.js, Python</p>
              </div>
            </AnimatedCard>
          </FadeIn>
        </div>

        <div className="col-span-2 space-y-6">
          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Bookmark />
              </motion.div>
              Saved Projects
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <AnimatedCard>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-indigo-400">EcoTrack AI</h3>
                  <p className="text-slate-400">AI-powered app to track personal carbon footprint.</p>
                </div>
                <Link to="/mentor/p1">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button>Resume Work</Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedCard>
          </FadeIn>

          <FadeIn delay={0.4}>
            <AnimatedCard>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-indigo-400">MedChain</h3>
                  <p className="text-slate-400">Blockchain secure medical records.</p>
                </div>
                <Link to="/mentor/p2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button>Resume Work</Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
