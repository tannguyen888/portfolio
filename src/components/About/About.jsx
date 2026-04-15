import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'
import Card from '../About/Card'
import profileImg from '../../assets/images/profile.jfif'

const handleDownloadResume = () => {
  const link = document.createElement('a'); 
  link.href = '/Tan-Phat-Nguyen-Resume.pdf';
  link.download = 'Tan-Phat-Nguyen-Resume.pdf';
  link.click();
}
const About = () => {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6">
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 section-heading section-heading-glow">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition duration-300" />
              <img
                src={profileImg}
                alt="Tan Phat Nguyen"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-amber-500/30"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Tan Phat Nguyen</h3>
            <p className="text-amber-400 font-medium text-sm mb-4 tracking-wide">Software Developer · Toronto, Canada</p>
            <p className="text-white-400 text-sm md:text-base leading-relaxed mb-5">
              Computer Programming student at George Brown College with hands-on experience in 
              Java, Spring Boot, React.js, and Node.js. I enjoy turning ideas into real products — from 
              full-stack web apps to desktop applications — and I'm always looking to grow and contribute 
              to meaningful, industry-level projects.
              <a href="#contact" className="text-amber-400 hover:text-amber-300 hover:underline ml-1 transition">Let's connect!</a>
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {[
                { icon: '🔸', text: 'George Brown College — Computer Programming Diploma' },
                { icon: '🔸', text: 'Java · Spring Boot · REST APIs · MVC Architecture' },
                { icon: '🔸', text: 'React.js · Node.js · JavaScript · Python' },
                { icon: '🔸', text: 'MySQL · SQLite · PostgreSQL · MongoDB' },
                { icon: '🔸', text: 'Git · GitHub · IntelliJ · VS Code · Agile' },
                { icon: '🔸', text: 'OOP · Data Structures · Algorithms · Unit Testing' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 text-xs md:text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={handleDownloadResume}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/25 text-sm md:text-base"
              >
                Download Resume
              </button>
            </div>
          </motion.div>
        </div>

        {/* Work Commitment */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm overflow-hidden height-50">
            {/* Subtle glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

            <h3 className="text-center text-sm font-semibold text-amber-400 tracking-[0.2em] uppercase mb-5">
               Work Commitment
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: 'Status', value: 'Open to Work', icon: '' },
                { label: 'Type', value: 'Full-time / Co-op', icon: '' },
                { label: 'Mode', value: 'On-site / Hybrid', icon: '' },
                { label: 'Location', value: 'Toronto, ON', icon: '' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center bg-white/5 border border-white/10 rounded-xl px-3 py-4 hover:border-amber-500/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                >
                  <span className="text-lg mb-1 block">{item.icon}</span>
                  <p className="text-[10px] md:text-xs text-2xl text-black uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xs md:text-sm text-white font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-white-500 text-xs mt-4 tracking-wide">
              Available immediately · Eager to contribute to meaningful projects
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <Card />
        </div>
      </motion.div>
    </section>
  )
}

export default About
