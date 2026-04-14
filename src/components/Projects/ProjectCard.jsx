const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 group">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl text-white font-semibold mb-2 group-hover:text-amber-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 whitespace-pre-line leading-relaxed">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
          View Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
