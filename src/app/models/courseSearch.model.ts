import { AcademicSubject } from '../models/academic-subject.model';
import { CareerPath } from '../models/careerPath.model';
import { CareerPathCourses } from '../models/careerPathCourses.model';

export interface CourseSearchData {
    careerPaths: CareerPath[];
    careerPathCourses: CareerPathCourses[];
    academicSubjects: AcademicSubject[];
}
