import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Choice from './pages/Choice';
import PartnerDetails from './pages/PartnerDetails';
import RoseAnimation from './pages/Animation';
import SingleMode from './pages/SingleMode';
import BreakupMode from './pages/BreakupMode';
import MusicPlayer from './components/MusicPlayer';
import { MusicProvider } from './context/MusicContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/mingle" element={<PartnerDetails />} />
        <Route path="/animation" element={<RoseAnimation />} />
        <Route path="/single" element={<SingleMode />} />
        <Route path="/breakup" element={<BreakupMode />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <MusicProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="font-sans antialiased text-gray-900">
          <AnimatedRoutes />
          <MusicPlayer />
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;
