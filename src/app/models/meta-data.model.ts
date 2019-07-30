import { AcademicSubject } from './academic-subject.model';
import { Strand } from './strand.model';
import { Career } from './career.model';
import { Outcome } from './outcome.model';
import { Grade } from './grade.model';
import { StandardNumber } from './standard-number.model';
import { Cluster } from './cluster.model';
import { CompetencyNumber } from './competency-number.model';


export interface MetaData {
  academicSubjects: AcademicSubject[],
  strands: Strand[],
  careers: Career[],
  outcomes: Outcome[],
  grades: Grade[],
  standardNumbers: StandardNumber[],
  clusters :Cluster[],
  competencyNumbers : CompetencyNumber[]
}

