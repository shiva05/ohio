import { AcademicSubject } from './academic-subject.model';
import { Standard } from './standard.model';
import { Career } from './career.model';
import { Outcome } from './outcome.model';
import { Grade } from './grade.model';
import { StandardNumber } from './standard-number.model';


export interface MetaData {
  academicSubjects: AcademicSubject[],
  standards: Standard[],
  careers: Career[],
  outcomes: Outcome[],
  grades: Grade[],
  standardNumbers: StandardNumber[]
}

