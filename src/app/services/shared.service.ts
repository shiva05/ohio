import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  data: any = [];
  updateAlignmentSearch = false;
  updateCourseSearch = false;

  constructor() { }

  careerPathSettings = {
    singleSelection: false,
    idField: 'CareerPathId', textField: 'CareerPathName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  careerPathCourseSettings = {
    singleSelection: false,
    idField: 'CourseId', textField: 'CourseName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  academicSubjectsSettings = {
    singleSelection: false,
    idField: 'SubjectId', textField: 'SubjectName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  subjectsDefaultSettings = {
    singleSelection: false,
    idField: 'GradeSubjectId', textField: 'LevelValue',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  academicSubjectsDefaultSettings = {
    singleSelection: false,
    idField: 'SubjectLevelsPk', textField: 'LevelValue1',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  academicSubjectCourseSettings = {
    singleSelection: false,
    idField: 'LevelId', textField: 'LevelValue',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  dropdownSettings = {
    singleSelection: false,
    idField: 'CareerFieldId', textField: 'CareerFieldName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  careerFieldDropdownSettings = {
    singleSelection: false,
    idField: 'CareerFieldId', textField: 'CareerFieldName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  strandDropdownSettings = {
    singleSelection: false,
    idField: 'StrandPk', textField: 'StrandName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  outcomeDropdownSettings = {
    singleSelection: false,
    idField: 'OutcomePk', textField: 'OutcomeName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  academicSubjectDropdownSettings = {
    singleSelection: false,
    idField: 'SubjectId', textField: 'SubjectName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  competencyDropdownSettings = {
    singleSelection: false,
    idField: 'CompetencyPk', textField: 'CompetencyName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
}
