import * as AdvancedSearchActions from '../actions/advanced-search.actions';
import { AcademicSubject } from './../models/academic-subject.model';
import { Strand } from './../models/strand.model';
import { Career } from './../models/career.model';
import { Outcome } from './../models/outcome.model';
import { Grade } from './../models/grade.model';
import { StandardNumber } from './../models/standard-number.model';
import { CompetencyNumber } from './../models/competency-number.model';
import { Cluster } from './../models/cluster.model';

export interface MetaData {

}
export interface AdvancedSearchData {
  metaData : MetaData,
  competencies : CompetencyNumber[],
  alignmentSearchSelectedFilters :AlignmentSearchSelectedFilters

}
export interface AlignmentSearchSelectedFilters {
  selectedCareers : Career[],
  selectedStrands: Strand[],
  selectedOutcomes: Outcome[],
  selectedCompetencies :CompetencyNumber[],
  selectedAcadamicSubjects :selectedAcademicSubject[],
  selectedAsSearchResults :any
}
export interface selectedAcademicSubject{
    selectedGrades : Grade[],
    selectedClusters : Cluster[]
    selectedStandardNumbers : StandardNumber[]
}

const initialState: AdvancedSearchData = {metaData :{
  academicSubjects: [],
  Strands: [],
  CareerFields: [],
  Outcomes: [],
  Subjects :[]
},
competencies:[],
alignmentSearchSelectedFilters :{
  selectedCareers : [],
  selectedStrands: [],
  selectedOutcomes: [],
  selectedCompetencies :[],
  selectedAcadamicSubjects: [],
  selectedAsSearchResults :{}
}
};
export function advancedSearchReducer(state = initialState ,Action :AdvancedSearchActions.Actions){
  switch(Action.type){
    case AdvancedSearchActions.LOAD_META_DATA_SUCCESS:
      return {
        ...state,
        metaData :Action.payload
      };
    case AdvancedSearchActions.LOAD_META_DATA_FAILURE:
    return {
      ...state,
      metaData :Action.payload
    };
    case AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS:
    return { ...state,
      alignmentSearchSelectedFilters :Action.payload
    };
    case AdvancedSearchActions.LOAD_COMPETENCY_DATA_SUCCESS:
      return {
        ...state,
        competencies: Action.payload
      };
    case AdvancedSearchActions.LOAD_COMPETENCY_DATA_FAILURE:
      return {
        ...state,
        metaData: Action.payload
      };

    case AdvancedSearchActions.RESET_ALIGNMENTSEARCH_FILTERS:
      return {
        ...state,
        alignmentSearchSelectedFilters: Action.payload
      };
    default:
      return state;
  }
}
