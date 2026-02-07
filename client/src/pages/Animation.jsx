import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, RefreshCw } from 'lucide-react';
import roseImage from '../assets/image.png'; // Importing the image
import { useMusic } from '../context/MusicContext';

const FloatingHeart = ({ delay }) => {
    const randomX = Math.random() * 100;
    const randomDuration = Math.random() * 5 + 5;
    const size = Math.random() * 20 + 10;
    
    return (
        <motion.div
            initial={{ y: '110vh', x: `${randomX}vw`, opacity: 0, scale: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 0], scale: 1 }}
            transition={{ duration: randomDuration, ease: "linear", delay: delay, repeat: Infinity }}
            className="fixed text-rose-500/60 z-0"
        >
            <Heart size={size} fill="currentColor" />
        </motion.div>
    );
};



const RoseAnimation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { maleName, femaleName } = location.state || { maleName: 'He', femaleName: 'She' };
    const { playTrack, setIsPlaying } = useMusic();

    useEffect(() => {
        playTrack('/formingle/song.mp3');
        if (!location.state) {
             // Optional: Redirect logic if needed
        }
        return () => setIsPlaying(false);
    }, [location.state]);

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-neutral-950 to-neutral-950"></div>
            
            {/* Floating Hearts Background */}
            {Array.from({ length: 20 }).map((_, i) => (
                <FloatingHeart key={i} delay={Math.random() * 10} />
            ))}

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl w-full"
            >
                <div className="glass bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col items-center text-center">
                    
                    {/* Header Message */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-600 font-sans tracking-tight mb-8"
                    >
                        Happy Rose Day 🌹
                    </motion.h1>

                    {/* Image Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <img 
                            src={roseImage} 
                            alt="Rose Day Celebration" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Names Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-between items-end gap-4">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="text-left"
                            >
                                <p className="text-white/60 text-xs md:text-sm font-mono tracking-widest uppercase">To</p>
                                <h3 className="text-xl md:text-3xl font-bold text-rose-200">{femaleName}</h3>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                                className="text-right"
                            >
                                <p className="text-white/60 text-xs md:text-sm font-mono tracking-widest uppercase">From</p>
                                <h3 className="text-xl md:text-3xl font-bold text-white">{maleName}</h3>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Footer Message */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-neutral-400 text-lg md:text-xl font-light italic mb-8"
                    >
                        "Idi rose kaadu boss… Heart ki direct message!"
                    </motion.p>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors shadow-lg shadow-rose-900/20"
                    >
                        <RefreshCw size={18} />
                        Replay Story
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default RoseAnimation;
