type CaseStudyPath = '/work/paste';

export interface EvidenceLink {
  href: string;
  label: string;
}

interface CaseStudySection {
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
