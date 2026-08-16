import type { ReactElement } from 'react';

import type { Project } from '../../content/resume';

export function ProjectEntry({ project }: { project: Project }): ReactElement {
  return (
    <article>
      <h3 className="font-serif text-heading">
        {project.url ? <a href={project.url}>{project.name}</a> : project.name}
      </h3>
      <p className="mt-1">{project.description}</p>
    </article>
  );
}
