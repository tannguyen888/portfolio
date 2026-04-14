import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const { ref, isInView } = useScrollAnimation()

  const projects = [
  {
    id: 1,
    title: 'TaxNova - Smart Tax Management System',
    description: ` Secure authentication (login/logout)
 Real-time financial dashboard
 Receipt management system
 Automated tax calculation engine
 Export reports to PDF
 Integrated AI chatbot assistant
 PostgreSQL with auto migration`,
    image: '',
    link: 'https://github.com/tannguyen888/TaxNova'
  },
  {
    id: 2,
    title: 'Movie Review Platform',
    description: ` Browse and search movies
 User rating and review system
 Submit and manage reviews
 Built with React + Spring Boot
 RESTful API integration`,
    image: '',
    link: 'https://github.com/tannguyen888/WebMovie'
  },
  {
    id: 3,
    title: 'HR Management System',
    description: ` Employee management (CRUD)
 Attendance tracking
 Automated payroll calculation
 Persistent data storage
 Built with JavaFX + Maven`,
    image: '',
    link: 'https://github.com/tannguyen888/Hr-Management-app'
  }
];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
