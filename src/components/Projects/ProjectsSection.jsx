import { useState } from 'react';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import VideoModal from './VideoModal';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="px-4 md:px-8 pt-10 pb-16 max-w-[1200px] mx-auto relative">
      <div className="flex flex-col gap-2 mb-12">
        <div className="flex items-center gap-2">
          <span className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] font-mono">
            PROJECTS
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight m-0 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          What we've been building
        </h2>
      </div>

      {/* Each ProjectCard now manages its own scroll runway + sticky pin internally */}
      <div className="relative flex flex-col gap-0">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id || i}
            project={project}
            index={i}
            total={projects.length}
            onPlay={setActiveProject}
          />
        ))}
      </div>

      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}