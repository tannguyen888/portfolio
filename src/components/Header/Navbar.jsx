import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    function CurrentTime(){
        const[time, setTime] = useState(new Date().toLocaleTimeString());
        useEffect(()=>{
            const resetTime = setInterval(()=>{
                setTime(new Date().toLocaleTimeString());
            },1000);
            return()=>{
                clearInterval(resetTime);
            };
        },[]);
        return time;
    }
    function blinking()
    {
        const [isBlinking, setIsBlinking] = useState(false);
        useEffect(() => {
            const blinkInterval = setInterval(() => {
                setIsBlinking(prev => !prev);
            }, 500);
            return () => clearInterval(blinkInterval);
        }, []);
        return isBlinking ? 'text-amber-400' : 'text-gray-400';
    }


  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="flex items-center justify-between px-4 md:px-6 py-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.a
        href="#"
        className={`text-lg md:text-xl font-bold tracking-widest ${blinking()} transition`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >Portfolio</motion.a>

      {/* Hamburger button - mobile only */}
      <button
        className="md:hidden text-white z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop menu */}
      <motion.ul
        className="hidden md:flex gap-6 sticky top-4 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <li><a href="#home" className="text-gray-300 font-bold hover:text-white hover:bg-amber-500/20 border border-gray-600/60 px-3 py-1.5 rounded-lg hover:border-amber-500/40 hover:scale-105 transition-all duration-300">Tan Phat Nguyen</a></li>
        <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">Toronto, CA / {CurrentTime()}</a></li>
        <li><a href="#about" className="text-gray-400 font-bold hover:text-amber-400 transition">ABOUT</a></li>
        <li><a href="#skills" className="text-gray-400 font-bold hover:text-amber-400 transition">SKILLS</a></li>
        <li><a href="#projects" className="text-gray-400 font-bold hover:text-amber-400 transition">PROJECTS</a></li>
        <li><a href="#contact" className="text-gray-400 font-bold hover:text-amber-400 transition">CONTACT</a></li>
        <li><a href="#feedback" className="text-gray-400 font-bold hover:text-amber-400 transition">FEEDBACK</a></li>
        <li className="flex items-center gap-3 ml-2">
          <a href="https://github.com/tannguyen888" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.facebook.com/nguyen.tan.phat.475680/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </li>
      </motion.ul>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm md:hidden z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center gap-4 py-6">
            <li><a href="#home" onClick={() => setMenuOpen(false)} className="text-gray-300 font-bold hover:text-amber-400 border border-gray-600/60 px-3 py-1.5 rounded-lg hover:border-amber-500/40 transition-all duration-300">Tan Phat Nguyen</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">{CurrentTime()}</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-amber-400 text-lg transition">ABOUT</a></li>
            <li><a href="#skills" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-amber-400 text-lg transition">SKILLS</a></li>
            <li><a href="#projects" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-amber-400 text-lg transition">PROJECTS</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-amber-400 text-lg transition">CONTACT</a></li>
            <li><a href="#feedback" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-amber-400 text-lg transition">FEEDBACK</a></li>
            <li className="flex items-center gap-4 mt-2">
              <a href="https://github.com/tannguyen888" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.facebook.com/nguyen.tan.phat.475680/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
