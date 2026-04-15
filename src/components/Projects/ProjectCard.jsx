import { useState } from 'react'

const ProjectCard = ({ title, description, image, link }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 group h-full flex flex-col backdrop-blur-sm">
      {image && !imgError ? (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-amber-500/10 to-orange-500/5 flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
      )}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl text-white font-semibold mb-2 group-hover:text-amber-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 whitespace-pre-line leading-relaxed flex-1">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
          View Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
