import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Maximize2 } from 'lucide-react';

import { useMusic } from '../context/MusicContext';

const MusicPlayer = () => {
    const { isPlaying, setIsPlaying, currentTrack, togglePlay } = useMusic();
    const audioRef = useRef(null);

    const handlePlay = () => {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
             playPromise.catch(error => {
                 if (error.name !== 'AbortError') {
                     console.error("Playback failed:", error);
                 }
             });
        }
    };

    useEffect(() => {
        if (currentTrack) {
            audioRef.current.src = currentTrack;
            if (isPlaying) {
                handlePlay();
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        if (isPlaying) {
            handlePlay();
            document.documentElement.classList.add('dark-romantic');
        } else {
            audioRef.current.pause();
            document.documentElement.classList.remove('dark-romantic');
        }
    }, [isPlaying]);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className={`fixed bottom-4 left-4 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${
                isPlaying ? 'bg-rose-600 text-white shadow-rose-500/50' : 'bg-white/80 text-gray-600'
            }`}
        >
            <div className="flex items-center gap-2">
                <Music size={20} className={isPlaying ? "animate-pulse" : ""} />
                <span className="text-sm font-bold hidden md:block">
                    {isPlaying ? "Mood: Deep" : "Mood: Soft"}
                </span>
            </div>
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-rose-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
            <audio ref={audioRef} loop />
        </motion.button>
    );
};

export default MusicPlayer;
