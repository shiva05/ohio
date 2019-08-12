import { CareerPath } from './careerPath.model';
import { CareerPathCourses } from './careerPathCourses.model';
import { AcademicSubject } from './academic-subject.model';
import { AcademicSubjectCourses } from './academic-subject-course.model';

export interface CourseSearchSelectedFilters {
    selectedCareerPath: CareerPath[];
    selectedCareerPathCourses: CareerPathCourses[];
}

export interface SelectedAcademicSubject {
    selectedAcademicSubject: AcademicSubject[];
    selectedAcademicSubjectCourses: AcademicSubjectCourses[];
}
