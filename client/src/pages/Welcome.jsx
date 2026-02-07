import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import SparklesPreview from '../components/SparklesPreview';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            
            <div className="relative w-full max-w-5xl">
                <SparklesPreview />
                
                <motion.div
                    className="absolute bottom-20 left-0 right-0 flex justify-center z-50"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/choice')}
                        className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold font-sans shadow-xl hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                        Explore Love Story <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};


export default Welcome;
