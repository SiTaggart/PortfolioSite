import { paste } from './paste';
import type { CaseStudy } from './types';

export type { CaseStudy, EvidenceLink } from './types';

export const caseStudies: ReadonlyArray<CaseStudy> = [paste];

export { paste };
