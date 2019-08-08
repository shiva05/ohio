import { CareerPath } from './careerPath.model';
import { CareerPathCourses } from './careerPathCourses.model';
import { AcademicSubject } from './academic-subject.model';

export interface CourseSearchSelectedFilters {
    selectedCareerPath: CareerPath[];
    selectedCareerPathCourses: CareerPathCourses[];
}

export interface SelectedAcademicSubject {
    selectedAcademicSubject: AcademicSubject[];
}
