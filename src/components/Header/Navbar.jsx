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
      className="flex items-center justify-between px-4 md:px-6 py-4 relative"
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
        className="hidden md:flex gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <li><a href="#home" className="text-grey-400 font-bold hover:text-white hover:bg-amber-300 border-2 border-gray-600 p-[10px] rounded-lg transform hover:scale-105 transition duration-300">Tan Phat Nguyen</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Toronto,Canada/{CurrentTime()}</a></li>
        <li><a href="#about" className="text-gray-400 font-bold hover:text-white">(ABOUT)</a></li>
        <li><a href="#skills" className="text-gray-400 font-bold hover:text-white">(SKILLS)</a></li>
        <li><a href="#contact" className="text-gray-400 font-bold hover:text-white">Contact</a></li>
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
            <li><a href="#home" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-white hover:bg-amber-300 border-2 border-gray-600 p-[10px] rounded-lg transition duration-300">Tan Phat Nguyen</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm">{CurrentTime()}</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-white text-lg">(ABOUT)</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-white text-lg">(SERVICES)</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)} className="text-gray-400 font-bold hover:text-white text-lg">Contact</a></li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
