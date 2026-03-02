import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Send, Sparkles, Heart, Shield } from 'lucide-react';

export const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Implement email capture logic
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-full h-64 bg-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="z-10 max-w-4xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6 space-x-2">
            <Sparkles className="w-8 h-8 text-teal-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
              MeetEzri
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Something Extraordinary <br /> is Coming Soon
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your personal AI companion for mental wellness, growth, and safety. 
            We're crafting a safe space where technology meets empathy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12"
        >
          <Card 
            icon={<Heart className="w-6 h-6 text-pink-400" />}
            title="Emotional Support"
            description="24/7 empathetic AI companion ready to listen and support your journey."
          />
          <Card 
            icon={<Shield className="w-6 h-6 text-blue-400" />}
            title="Safety First"
            description="Built with privacy and safety at its core, ensuring a secure environment."
          />
          <Card 
            icon={<Sparkles className="w-6 h-6 text-amber-400" />}
            title="Personal Growth"
            description="Tools and insights designed to help you thrive and achieve your goals."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-md mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
            <p className="text-slate-400 text-sm mb-4">
              Be the first to know when we launch early access.
            </p>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className={`bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 ${isSubmitted ? 'w-full' : ''}`}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <span className="flex items-center">We'll be in touch! <Sparkles className="ml-2 w-4 h-4" /></span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-6 text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} MeetEzri. All rights reserved.
      </div>
    </div>
  );
};

const Card = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors duration-300 text-left">
    <div className="mb-4 bg-slate-900/50 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-700">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-slate-200">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default ComingSoon;
