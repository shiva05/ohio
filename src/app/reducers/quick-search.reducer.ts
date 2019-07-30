import * as QuickSearchActions from '../actions/quick-search.actions';
import { AcademicSubject } from './../models/academic-subject.model';
import { Strand } from './../models/strand.model';
import { Career } from './../models/career.model';
import { Outcome } from './../models/outcome.model';
import { Grade } from './../models/grade.model';
import { StandardNumber } from './../models/standard-number.model';
import { CompetencyNumber } from './../models/competency-number.model';

export interface QsMetaData {
  academicSubjects: AcademicSubject[],
  careers: Career[]
}

const initialState: QsMetaData = {
  academicSubjects: [],
  careers: []
};
export function quickSearchReducer(state = initialState ,Action :QuickSearchActions.Actions){
  switch(Action.type){
    case QuickSearchActions.LOAD_QS_META_DATA_SUCCESS:
      return {academicSubjects:Action.payload.academicSubjects,
        careers:Action.payload.careers
      };
    case QuickSearchActions.LOAD_QS_META_DATA_FAILURE:
    return {academicSubjects:Action.payload.academicSubjects,
      careers:Action.payload.careers
    };
    default:
      return state;
  }
}
