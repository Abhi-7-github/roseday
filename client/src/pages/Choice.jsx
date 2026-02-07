    import {
        TextRevealCard,
        TextRevealCardDescription,
        TextRevealCardTitle,
    } from "../components/ui/text-reveal-card";

    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';

    import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
    import { EvervaultCard, Icon } from '../components/ui/evervault-card';

    import { useMusic } from '../context/MusicContext';

    const ChoiceCardWrapper = ({ title, icon, onClick, delay }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5 }}
                onClick={onClick}
                className="cursor-pointer w-full max-w-xs"
            >
                <div className="border border-white/[0.2] flex flex-col items-start w-full p-4 relative h-[20rem] bg-black/20 backdrop-blur-sm rounded-3xl hover:border-rose-500/50 transition-colors">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

                    <EvervaultCard text={title} icon={icon} />

                    <div className="absolute top-2 right-2 text-rose-200 text-xs font-mono uppercase tracking-widest opacity-50">
                        Status: {title}
                    </div>
                </div>
            </motion.div>
        );
    };

    const Choice = () => {
        const navigate = useNavigate();
        const [message, setMessage] = useState(null);
        const { playTrack } = useMusic();
        
        const [showCaution, setShowCaution] = useState(false);
        const [countdown, setCountdown] = useState(5);
        const [targetPath, setTargetPath] = useState(null);

        useEffect(() => {
            let timer;
            if (showCaution && countdown > 0) {
                timer = setInterval(() => {
                    setCountdown((prev) => prev - 1);
                }, 1000);
            } else if (showCaution && countdown === 0 && targetPath) {
                 navigate(targetPath);
            }
            return () => clearInterval(timer);
        }, [showCaution, countdown, navigate, targetPath]);

        const handleChoice = (type) => {
            if (type === 'mingle') {
                navigate('/mingle');
            } else {
                if (type === 'single') {
                   setTargetPath('/single');
                   setShowCaution(true);
                   setCountdown(5);
                } else if (type === 'breakup') {
                   setTargetPath('/breakup');
                   setShowCaution(true);
                   setCountdown(5);
                }
            }
        };

        return (
            <BackgroundBeamsWithCollision className="min-h-screen flex-col relative">
                
                {/* Caution Overlay */}
                <AnimatePresence>
                    {showCaution && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
                        >
                            <div className="text-center p-8 max-w-md">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="mb-6 flex justify-center"
                                >
                                     <Icon className="w-20 h-20 text-rose-500" /> {/* Using Icon as placeholder for headphones if needed, or just text */}
                                </motion.div>
                                <h2 className="text-3xl font-bold text-white mb-4 font-fantasy">🎧 Use Earphones</h2>
                                <p className="text-rose-200 mb-8 text-lg">For the best experience, please plug in your earphones. The magic begins in...</p>
                                
                                <div className="text-6xl font-bold text-rose-500 font-mono">
                                    {countdown}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full py-10 px-4">
                    <div className="flex items-center justify-center min-h-[15rem] h-auto rounded-2xl w-full max-w-4xl mb-8">
                        <TextRevealCard
                            text="What's your status?"
                            revealText="Choose Wisely 🌹"
                            className="w-full"
                        >
                            <TextRevealCardTitle className="text-2xl md:text-3xl">
                                Rose Day Decision
                            </TextRevealCardTitle>
                            <TextRevealCardDescription className="text-sm md:text-base">
                                Hover over the text to reveal the hidden message.
                            </TextRevealCardDescription>
                        </TextRevealCard>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8 relative z-10 w-full max-w-6xl">
                        <ChoiceCardWrapper 
                            title="Single" 
                            icon="💔" 
                            delay={0.2}
                            onClick={() => handleChoice('single')}
                        />
                        <ChoiceCardWrapper 
                            title="Mingle" 
                            icon="🌹" 
                            delay={0.4}
                            onClick={() => handleChoice('mingle')}
                        />
                        <ChoiceCardWrapper 
                            title="Breakup" 
                            icon="🥀" 
                            delay={0.6}
                            onClick={() => handleChoice('breakup')}
                        />
                    </div>

                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="fixed bottom-10 bg-white/90 text-rose-600 px-8 py-4 rounded-full shadow-2xl font-bold text-lg text-center z-50"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </BackgroundBeamsWithCollision>
        );
    };

    export default Choice;
