import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Send, Sparkles, Heart, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

export const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background */}
      <BackgroundBeams mousePosition={mousePosition} />
      
      <div className="z-10 max-w-5xl w-full flex flex-col items-center relative">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm text-teal-400 text-xs font-medium uppercase tracking-wider shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Coming Soon
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 relative"
        >
          <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-30 pointer-events-none rounded-full" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-sm">
            Meet Ezri
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Your personal AI companion for <span className="text-teal-400 font-medium">mental wellness</span>, <span className="text-blue-400 font-medium">growth</span>, and <span className="text-purple-400 font-medium">safety</span>.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 px-4"
        >
          <FeatureCard 
            icon={<Heart className="w-6 h-6 text-pink-400" />}
            title="Emotional Support"
            description="24/7 empathetic AI companion ready to listen, understand, and support your unique journey."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-teal-400" />}
            title="Safety First"
            description="Built with privacy and safety at its core. Your data is encrypted and your space is secure."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-amber-400" />}
            title="Personal Growth"
            description="Actionable insights, mood tracking, and tools designed to help you thrive every day."
            delay={0.5}
          />
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full max-w-md mx-auto relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-25"></div>
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
             {/* Shine effect */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Join the Waitlist</h3>
              <p className="text-slate-400 text-sm">
                Be the first to experience the future of mental wellness.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-teal-500 h-12 pl-4 pr-4 rounded-xl transition-all duration-300 hover:border-slate-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className={cn(
                    "h-12 rounded-xl text-base font-medium transition-all duration-500 shadow-lg shadow-teal-500/20",
                    isSubmitted 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white"
                  )}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Added to Waitlist
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Notify Me <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-slate-600 text-sm flex items-center gap-6"
        >
          <span>&copy; {new Date().getFullYear()} MeetEzri</span>
          <span className="w-1 h-1 rounded-full bg-slate-800" />
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
        </motion.div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-500/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative h-full bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors duration-300">
        <div className="mb-4 bg-slate-950 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-teal-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
      </div>
    </motion.div>
  );
};

// Background Beams Component
const BackgroundBeams = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 30, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen"
      />
      
      {/* Spotlight Effect following mouse */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.06), transparent 40%)`
        }}
      />
    </div>
  );
};

export default ComingSoon;
