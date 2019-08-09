export interface AcademicCourses {
    LevelId: string;
    LevelValue: string;
}

export interface AcademicSubjectCourses {
    SubjectId: string;
    SubjectName: string;
    AcademicCourses: AcademicCourses[];
}
