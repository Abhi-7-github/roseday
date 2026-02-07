import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Heart } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { useMusic } from '../context/MusicContext';

const SingleMode = () => {
    const { playTrack, setIsPlaying } = useMusic();

    useEffect(() => {
        playTrack("/forsingle/song.mp3");
        return () => setIsPlaying(false);
    }, []);

    return (
        <BackgroundBeamsWithCollision className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
            
            {/* Pulsing Aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-rose-500/30 rounded-full"
                        initial={{ width: '200px', height: '200px', opacity: 0.8 }}
                        animate={{ 
                            width: ['200px', '600px'], 
                            height: ['200px', '600px'], 
                            opacity: [0.5, 0],
                            borderWidth: ['2px', '0px']
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            {/* Main Visual */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative z-10 flex flex-col items-center"
            >
                <div className="relative mb-12">
                     <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="p-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-2xl shadow-rose-500/50"
                     >
                        <Headphones size={80} className="text-white relative z-10" />
                     </motion.div>
                     
                     {/* Sound wave bars */}
                     <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-end gap-1 h-12">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-rose-400 rounded-full"
                                animate={{ height: [10, 40, 10] }}
                                transition={{ 
                                    duration: 0.5, 
                                    repeat: Infinity, 
                                    delay: i * 0.1,
                                    repeatType: "reverse" 
                                }}
                            />
                        ))}
                     </div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center max-w-xl px-6"
                >
                    <h1 className="text-4xl md:text-6xl font-fantasy font-bold text-white mb-6 drop-shadow-lg">
                        You Are Complete 🌹
                    </h1>
                    <p className="text-lg md:text-xl text-rose-200 font-sans leading-relaxed">
                        "Single కాదు boss… Limited Edition!"
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={32} />
                    </div>
                </motion.div>
            </motion.div>

        </BackgroundBeamsWithCollision>
    );
};

export default SingleMode;
