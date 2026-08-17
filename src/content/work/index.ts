import { accessibleSystems } from './accessibleSystems';
import { paste } from './paste';
import { sesco } from './sesco';
import type { CaseStudy } from './types';

export type { CaseStudy, EvidenceLink } from './types';

export const caseStudies: ReadonlyArray<CaseStudy> = [sesco, paste, accessibleSystems];

interface CaseStudyNeighbours {
  next?: CaseStudy;
  previous?: CaseStudy;
}

export function caseStudyNeighbours(study: CaseStudy): CaseStudyNeighbours {
  const index = caseStudies.indexOf(study);

  return {
    next: caseStudies.at(index + 1),
    previous: index === 0 ? undefined : caseStudies.at(index - 1),
  };
}

export { accessibleSystems, paste, sesco };
