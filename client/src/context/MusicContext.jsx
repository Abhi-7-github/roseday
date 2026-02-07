import React, { createContext, useState, useContext, useRef } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const audioRef = useRef(null);

    const playTrack = (trackUrl) => {
        if (currentTrack === trackUrl && isPlaying) {
             // If same track is playing, do nothing or maybe restart?
             // For now, let's just ensure it's playing
             if(audioRef.current) audioRef.current.play();
             return;
        }

        setCurrentTrack(trackUrl);
        setIsPlaying(true);
        // actual audio element handling will be in MusicPlayer which consumes this context
        // OR we can manage the audio object here. 
        // For better UI integration (visualizers etc), let's keep the audio element in MusicPlayer 
        // but control it via state here, or expose a ref.
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // We can also just expose the state and let the MusicPlayer component react to it.
    
    return (
        <MusicContext.Provider value={{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack, playTrack, togglePlay }}>
            {children}
        </MusicContext.Provider>
    );
};
