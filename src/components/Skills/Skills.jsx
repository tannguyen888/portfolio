import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'

const Skills = () => {
  const { ref, isInView } = useScrollAnimation()
  const skills = ['Java', 'Spring-Boot', 'Node-js', 'React-js', 'Tailwind CSS', 'Git', 'SQL', 'Python','PostgreSQL','MongoDB'];

  return (
    <section id="skills" className="py-12 md:py-20 px-4 md:px-6">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 md:px-4 py-2 rounded-full font-medium text-sm md:text-base hover:bg-amber-500/20 transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
