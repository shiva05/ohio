import { AcademicSubject } from './academic-subject.model';
import { Strand } from './strand.model';
import { Career } from './career.model';
import { Outcome } from './outcome.model';
import { Grade } from './grade.model';
import { StandardNumber } from './standard-number.model';

export interface ReportRecord {
  title: string;
  strand: string;
  careerField: string;
  outcome: string;
  competency: string;
  domain: string;
  grade: string;
  academicSubject: string;
  standards: Standard[];
}
export interface Standard {
  standardType: string;
  standardDesc: string;
}

