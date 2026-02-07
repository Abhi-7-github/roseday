import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="relative w-full mb-6 group">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full bg-white/20 border-2 border-white/50 rounded-xl px-4 py-4 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/30 transition-all text-lg font-sans shadow-inner backdrop-blur-sm"
                placeholder={placeholder}
            />
            <label className="absolute left-4 -top-3 bg-white text-rose-500 px-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transform transition-all group-focus-within:scale-110">
                {label}
            </label>
        </div>
    );
};

import { MacbookScroll } from '../components/ui/macbook-scroll';
import roseBg from '../assets/image.png';

const PartnerDetails = () => {
    const navigate = useNavigate();
    const [maleName, setMaleName] = useState('');
    const [femaleName, setFemaleName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (maleName && femaleName) {
            navigate('/animation', { state: { maleName, femaleName } });
        }
    };

    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
            <MacbookScroll
                title={
                    <span className="text-4xl md:text-5xl font-fantasy text-rose-500 font-bold mb-8 block drop-shadow-md">
                        Love Story Configuration <br /> 
                        <span className="text-2xl md:text-3xl font-sans text-gray-500 font-normal">Enter your names below</span>
                    </span>
                }
                src={roseBg}
                showGradient={true}
                badge={
                    <div className="h-10 w-10 transform -rotate-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Heart className="w-6 h-6 fill-current" />
                    </div>
                }
            />

            {/* Form Overlay - positioned to be accessible after scroll or Fixed? 
                Actually, the MacbookScroll component is huge (200vh). 
                The user wants to use this FOR the page. 
                Let's put the form in an overlay or below it.
                
                The request says "use this for partnerdetails page". 
                The MacbookScroll is a visual demo.
                Integrating a functional form INSIDE the Macbook screen is complex because the screen transforms.
                However, we can render the form as the "content" of the page, or maybe *on* the screen if we modify the component.
                
                For now, let's place the form nicely below the Macbook as the "Keyboard" area or just overlay it.
                Wait, the Macbook component structure is: H2 -> Lid -> Base.
                
                Let's just place the Form in an absolute overlay that appears when you scroll down, or just keep the original form design BUT 
                inside the page context. 
                
                Actually, let's look at the component. It takes `src` for the screen image.
                We can try to overlay the form on top of the screen by passing a custom component? No, it takes an image src.
                
                Alternative: We render the Form *below* the macbook scroll section, or
                We overlay it fixed on top.
                
                Let's try to put the form *inside* the generic <div> returned by MacbookScroll? No, we can't easily inject without modifying component.
                
                Best approach: render the MacbookScroll as the background/hero, and have the Form appear or be present.
                
                Let's place the Form in a Section BELOW the Macbook Scroll for now, or use a fixed overlay z-index.
            */}
            
            <div className="absolute top-[10%] md:top-[20%] left-0 right-0 z-50 flex justify-center pointer-events-none">
                 {/* This is just a visual wrapper, the form interactions might be tricky with the 3D transforms if we put it too close.
                     Let's use the screen area for a static "Love" image and put the form in a modal or a card that is visible.
                 */}
            </div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0B0B0F] relative z-40 -mt-[20vh] md:-mt-[50vh] pb-20 px-4">
                 <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 md:p-10 max-w-md w-full relative overflow-hidden shadow-2xl border-rose-200 border-2"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 text-rose-200 pointer-events-none"
                    >
                        <Sparkles size={200} />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-fantasy text-center text-rose-600 mb-2 drop-shadow-sm">Love Birds</h2>
                    <p className="text-center text-gray-600 mb-8 font-sans text-sm md:text-base">Who is starring in this love story?</p>
                    
                    <form onSubmit={handleSubmit} className="relative z-10">
                        <InputField 
                            label="Boy's Name" 
                            placeholder="Enter his name..." 
                            value={maleName}
                            onChange={(e) => setMaleName(e.target.value)}
                        />
                        <InputField 
                            label="Girl's Name" 
                            placeholder="Enter her name..." 
                            value={femaleName}
                            onChange={(e) => setFemaleName(e.target.value)}
                        />

                        <motion.button
                            disabled={!maleName || !femaleName}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 md:py-4 rounded-xl text-lg md:text-xl font-bold flex items-center justify-center gap-2 mt-4 shadow-lg transition-all ${
                                maleName && femaleName 
                                ? 'bg-rose-500 text-white hover:bg-rose-600 cursor-pointer' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            See the Magic <Sparkles size={20} />
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default PartnerDetails;
