import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'

const skillCategories = [
  {
    title: 'Back-End',
    icon: '🛰️',
    skills: ['Java', 'Maven', 'Spring Boot', 'Node.js'],
    color: 'from-cyan-400 to-blue-500',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    glow: 'rgba(34, 211, 238, 0.15)',
  },
  {
    title: 'Front-End',
    icon: '🚀',
    skills: ['React.js', 'Tailwind CSS'],
    color: 'from-purple-400 to-pink-500',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.15)',
  },
  {
    title: 'Databases',
    icon: '🪐',
    skills: ['SQL', 'PostgreSQL', 'MongoDB'],
    color: 'from-amber-400 to-orange-500',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    glow: 'rgba(251, 191, 36, 0.15)',
  },
  {
    title: 'Tools & Others',
    icon: '⭐',
    skills: ['Git', 'Python'],
    color: 'from-emerald-400 to-teal-500',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'rgba(52, 211, 153, 0.15)',
  },
]

const Skills = () => {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6">
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-5xl text-center mb-4 section-heading section-heading-glow">
          Skills
        </h2>
        <p className="text-center text-shadow-indigo-300-500 text-sm mb-10 tracking-widest uppercase">
          Technologies in my orbit
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className={`relative rounded-2xl border ${cat.border} backdrop-blur-sm p-6 overflow-hidden group`}
              style={{ background: `radial-gradient(ellipse at 30% 0%, ${cat.glow}, transparent 70%)` }}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              {/* Orbit ring decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-white/5 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className={`text-lg font-bold bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                  {cat.title}
                </h3>
                {/* Small orbit dot */}
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${cat.bg} ml-auto`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: catIdx * 0.5 }}
                  style={{ boxShadow: `0 0 6px ${cat.glow}` }}
                />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    className={`${cat.bg} ${cat.text} border ${cat.border} px-3 py-1.5 rounded-lg text-sm font-medium 
                      hover:scale-105 transition-transform cursor-default relative`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: catIdx * 0.15 + skillIdx * 0.08 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Shooting star on hover */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute w-16 h-[1px] rotate-45"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cat.glow.replace('0.15', '0.8')}, transparent)`,
                    animation: 'shootingStar 1.5s ease-in-out infinite',
                    top: '20%',
                    left: '-10%',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          @keyframes shootingStar {
            0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateX(400px) translateY(400px) rotate(45deg); opacity: 0; }
          }
        `}</style>
      </motion.div>
    </section>
  )
}

export default Skills
