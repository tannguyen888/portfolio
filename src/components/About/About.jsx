import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'
import Card from '../About/Card'
const handleDownloadResume = () => {
  const link = document.createElement('a'); 
  link.href = '/Tan-Phat-Nguyen-Resume.pdf';
  link.download = 'Tan-Phat-Nguyen-Resume.pdf';
  link.click();
}
const About = () => {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-6">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">About Me</h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
         I'm a passionate developer who enjoys building modern and responsive web applications. 
  I have experience working with technologies like Java, Spring Boot, React, and Node.js. 
  I like turning ideas into real products and constantly improving my skills through hands-on projects. 
  I'm currently looking for opportunities to grow and contribute to meaningful projects.
  <a href="#contact" className="text-blue-500 hover:underline ml-1">Feel free to reach out!</a>
        </p>
        <div className="flex justify-center mt-6 mx-auto"><button
      onClick={handleDownloadResume}
      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/25 text-sm md:text-base"
    >
      Download Resume
    </button></div>
        <div className="flex justify-center mt-6">
          <Card />
        </div>
      </motion.div>
    </section>
  )
}

export default About
