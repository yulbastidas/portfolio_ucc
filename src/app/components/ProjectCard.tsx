import React from 'react';
import { ImageIcon, Github } from 'lucide-react'; // Importa el icono de Github
import { Project } from '../../app/types';

interface ProjectCardProps {
  project: Project;
  githubUrl?: string;
  className?: string; // ✅ Añade la propiedad className a la interfaz
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, githubUrl, className }) => {
  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <div
      className={`min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer relative ${className}`} // ✅ Utiliza la prop className
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={64} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-center">{project.title}</h3>
        {project.description && (
          <p className="text-sm text-gray-600 mt-2">{project.description}</p>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <Github size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;