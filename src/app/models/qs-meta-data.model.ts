import { AcademicSubject } from './academic-subject.model';
import { Standard } from './standard.model';
import { Career } from './career.model';
import { Outcome } from './outcome.model';
import { Grade } from './grade.model';
import { StandardNumber } from './standard-number.model';
import { Cluster } from './cluster.model';
import { CompetencyNumber } from './competency-number.model';


export interface QsMetaData {
  academicSubjects: AcademicSubject[],
  careers: Career[]
}

