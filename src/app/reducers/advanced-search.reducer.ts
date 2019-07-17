import * as AdvancedSearchActions from '../actions/advanced-search.actions';
import { AcademicSubject } from './../models/academic-subject.model';
import { Standard } from './../models/standard.model';
import { Career } from './../models/career.model';
import { Outcome } from './../models/outcome.model';
import { Grade } from './../models/grade.model';
import { StandardNumber } from './../models/standard-number.model';
import { CompetencyNumber } from './../models/competency-number.model';

export interface MetaData {
  academicSubjects: AcademicSubject[],
  standards: Standard[],
  careers: Career[],
  outcomes: Outcome[],
  grades: Grade[],
  standardNumbers: StandardNumber[]
}

const initialState: MetaData = {
  academicSubjects: [],
  standards: [],
  careers: [],
  outcomes: [],
  grades: [],
  standardNumbers: []
};
export function advancedSearchReducer(state = initialState ,Action :AdvancedSearchActions.Actions){
  switch(Action.type){
    case AdvancedSearchActions.LOAD_META_DATA_SUCCESS:
      return {academicSubjects:Action.payload.academicSubjects,
        standards:Action.payload.standards,
        careers:Action.payload.careers,
        outcomes:Action.payload.outcomes,
        standardNumbers:Action.payload.standardNumbers,
        grades:Action.payload.grades,
        cluster:Action.payload.clusters,
        competencyNumbers : Action.payload.competencyNumbers
      };
    case AdvancedSearchActions.LOAD_META_DATA_FAILURE:

    return {academicSubjects:Action.payload.academicSubjects,
      standards:Action.payload.standards,
      careers:Action.payload.careers,
      outcomes:Action.payload.outcomes,
      standardNumbers:Action.payload.standardNumbers,
      grades:Action.payload.grades,
      clusters:Action.payload.clusters,
      competencyNumbers : Action.payload.competencyNumbers
    };
    default:
      return state;
  }
}
