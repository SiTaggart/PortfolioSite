export type CaseStudyPath = '/work/accessible-systems' | '/work/paste' | '/work/sesco';

export type EvidenceLink =
  | { href: string; kind: 'external'; label: string }
  | { kind: 'post'; label: string; slug: string };

export interface CaseStudySection {
  heading: string;
  id: string;
  paragraphs: ReadonlyArray<string>;
}

export interface CaseStudy {
  description: string;
  evidence: ReadonlyArray<EvidenceLink>;
  name: string;
  organisation: string;
  outcomes: ReadonlyArray<string>;
  role: string;
  sections: ReadonlyArray<CaseStudySection>;
  standfirst: string;
  summary: string;
  title: string;
  to: CaseStudyPath;
  years: string;
}
