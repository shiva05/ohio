import * as CourseSearchActions from '../actions/course-search.actions';
import { AcademicSubject } from '../models/academic-subject.model';
import { CareerPath } from '../models/careerPath.model';
import { CareerPathCourses } from '../models/careerPathCourses.model';

export interface CourseSearchData {
    careerPaths: CareerPath[];
    careerPathCourses: CareerPathCourses[];
    academicSubjects: AcademicSubject[];
}

export interface CourseSearchSelectedFilters {
    selectedCareerPath: CareerPath[];
    selectedCareerPathCourses: CareerPathCourses[];
}

export interface CourseSearch {
    courseSearchData: CourseSearchData;
    courseSearchSelectedFilters: CourseSearchSelectedFilters;
}

// tslint:disable-next-line:no-empty-interface
export interface SelectedAcademicSubject {

}

const initialState: CourseSearch = {
    courseSearchData: {
        careerPaths: [],
        careerPathCourses: [],
        academicSubjects: []
    },
    courseSearchSelectedFilters: {
        selectedCareerPath: [],
        selectedCareerPathCourses: []
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
        case CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH:
            return {
                ...state,
                CourseSearchSelectedFilters: Action.payload
            };
        default:
            return state;
    }
}
