import { AcademicSubject } from './academic-subject.model';
import { Strand } from './strand.model';
import { Career } from './career.model';
import { Outcome } from './outcome.model';
import { Grade } from './grade.model';
import { StandardNumber } from './standard-number.model';
import { Cluster } from './cluster.model';
import { CompetencyNumber } from './competency-number.model';


export interface AlignmentSearchSelectedFilters {
  selectedCareers: Career[];
  selectedStrands: Strand[];
  selectedOutcomes: Outcome[];
  selectedCompetencies: CompetencyNumber[];
  selectedAcadamicSubjects: selectedAcademicSubject[];
}
export interface selectedAcademicSubject {
    selectedGrades: Grade[];
    selectedClusters: Cluster[];
    selectedStandardNumbers: StandardNumber[];
}

