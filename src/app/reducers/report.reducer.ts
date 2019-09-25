import * as ReportActions from '../actions/report.actions';



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

export interface ReportData {
  reportRecords: ReportRecord[];
}

const initialState: ReportData = {
  reportRecords : [
    {
      title: '',
      strand: '',
      careerField: '',
      outcome: '',
      competency: '',
      domain: '',
      grade: '',
      academicSubject: '',
      standards: []
    }
  ]

};


export function reportReducer(state= initialState, Action: ReportActions.Actions) {
  switch (Action.type) {
    case ReportActions.LOAD_REPORT_DATA_SUCCESS:
      return {};
    case ReportActions.LOAD_REPORT_DATA_FAILURE:

      return {
        reportRecords : Action.payload
      };
    default:
      return state;
  }
}
