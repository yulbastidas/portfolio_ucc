import React from 'react';
import { ImageIcon, Github, Link } from 'lucide-react';
import { Project } from '../../app/types';

interface ProjectCardProps {
  project: Project;
  githubUrl?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, githubUrl, className }) => {
  return (
    <article
      className={`min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 relative flex flex-col ${className}`}
    >
      <figure className="aspect-square bg-gray-100 flex items-center justify-center">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center">
            <ImageIcon size={64} className="text-gray-400" />
          </span>
        )}
      </figure>
      <main className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-center">{project.title}</h3>
        {project.description && (
          <p className="text-sm text-gray-600 mt-2 flex-grow">{project.description}</p>
        )}
        <footer className="flex justify-end gap-2 mt-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={`Ver ${project.title} en Vercel`}
            >
              <Link size={20} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={`Ver código de ${project.title} en GitHub`}
            >
              <Github size={20} />
            </a>
          )}
        </footer>
      </main>
    </article>
  );
};

export default ProjectCard;