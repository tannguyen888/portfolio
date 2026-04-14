const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6">
        <h3 className="text-xl text-black font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href={link} className="text-blue-500 hover:underline">View Project →</a>
      </div>
    </div>
  )
}

export default ProjectCard
