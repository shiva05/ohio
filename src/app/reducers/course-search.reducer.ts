import * as CourseSearchActions from '../actions/course-search.actions';
import { AcademicSubject } from '../models/academic-subject.model';
import { Career } from './../models/career.model';
import { CareerPath } from '../models/careerPath.model';
import { CareerPathCourses } from '../models/careerPathCourses.model';
import { AcademicSubjectCourses } from '../models/academic-subject-course.model';

export interface CourseSearchData {
  careers: Career[];
  careerPaths: CareerPath[];
  careerPathCourses: CareerPathCourses[];
  academicSubjects: AcademicSubject[];
  academicSubjectCourses: AcademicSubjectCourses[];
}

export interface CourseSearchSelectedFilters {
  selectedCareers: Career[];
  selectedCareerPath: CareerPath[];
  selectedCareerPathCourses: CareerPathCourses[];
  selectedAcademicSubject: AcademicSubject[];
  selectedAcademicSubjectCourses: AcademicSubjectCourses[];
}

export interface CourseSearch {
  courseSearchData: CourseSearchData;
  courseSearchSelectedFilters: CourseSearchSelectedFilters;
}

export interface SelectedAcademicSubject {
  courseSearchSelectedFilters: CourseSearchSelectedFilters;
}

const initialState: CourseSearch = {
  courseSearchData: {
    careers: [],
    careerPaths: [],
    careerPathCourses: [],
    academicSubjects: [],
    academicSubjectCourses: []
  },
  courseSearchSelectedFilters: {
    selectedCareers: [],
    selectedCareerPath: [],
    selectedCareerPathCourses: [],
    selectedAcademicSubject: [],
    selectedAcademicSubjectCourses: []
  }
};

export function courseSearchReducer(state = initialState, Action: CourseSearchActions.Actions) {
  switch (Action.type) {
    case CourseSearchActions.LOAD_COURSESEARCH_DATA_SUCCESS:
      return {
        ...state,
        courseSearchData: Action.payload
      };
    case CourseSearchActions.LOAD_COURSESEARCH_DATA_FAILURE:
      return {
        ...state,
        courseSearchData: Action.payload
      };
    case CourseSearchActions.SAVE_CS_SELECTED_FILTERS:
      return {
        ...state,
        courseSearchSelectedFilters: Action.payload
      };
    case CourseSearchActions.RESET_COURSE_SELECTED_FILTERS:
      return {
        ...state,
        courseSearchSelectedFilters: {
          selectedCareers: [],
          selectedCareerPath: [],
          selectedCareerPathCourses: [],
          selectedAcademicSubject: [],
          selectedAcademicSubjectCourses: []
        }
      };
    default:
      return state;
  }
}
