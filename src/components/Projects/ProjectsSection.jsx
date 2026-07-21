import { useState } from 'react';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import VideoModal from './VideoModal';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="px-4 md:px-8 pt-6 pb-16 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase text-[#a26bf0]">
          Projects
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight m-0 text-[#f6a56b]">
          What we've been building
        </h2>
      </div>

      {/* Cards Container */}
      <div className="relative flex flex-col gap-6 md:gap-0">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            onPlay={setActiveProject}
          />
        ))}

        {/* Minimal 30vh spacer so the last card overlays cleanly with zero extra scroll delay */}
        <div className="hidden md:block h-[30vh]" aria-hidden="true" />
      </div>

      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}