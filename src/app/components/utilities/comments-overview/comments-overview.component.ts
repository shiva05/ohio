import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentSubject, CommentSources } from '../../../models/comment-subject';
import { Comment } from './../../../models/comment';
import { CommentsService } from '../../../services/comments.service';
import { CommentSearch } from '../../../models/commentSearch';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { all } from 'q';

@Component({
  selector: 'app-comments-overview',
  templateUrl: './comments-overview.component.html',
  styleUrls: ['./comments-overview.component.css']
})
export class CommentsOverviewComponent implements OnInit {

  @Input('subjects') subjects: CommentSubject[] = [];
  @Input('sources') sources: CommentSources[] = [];
  @Input('filteredSubjects') filteredSubjects: CommentSubject[] = [];
  @Output('addSubject') addSubjectEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();
  @Output('addComment') addCommentEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();
  @Output('editComment') editCommentEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();


  displaySearchPanel: boolean = false;
  commentSearchModel: CommentSearch = { immediateOwnerSourceKey: 0, name: null, title: null, fromTs: null, toTs: null };
  //intitCommentSearchModel: CommentSearch = {immediateOwnerSourceKey: undefined, name: null, title: null, fromTs: null, toTs: null};

  content = {
    title: 'Comments',
    addNewSubjectBtn: 'Add New Subject'
  }

  showNew: boolean = false;

  constructor(private commentService: CommentsService) { }

  ngOnInit() {
  }


  displaySearchComments(event) {
    this.displaySearchPanel = true;
  }

  closeSearch(event) {
    this.displaySearchPanel = false;
  }

  clearCommentSearch() {
    this.commentSearchModel = { immediateOwnerSourceKey: 0, name: null, title: null, fromTs: null, toTs: null };
    this.filteredSubjects = this.subjects;

  }

  searchComments() {


    //Reset the subject array incase the user didn't clear the previous search criteria
    this.filteredSubjects = this.subjects;

    //***Perform array filtering***

    //FILTER ON COMMENT SOURCE
    this.filteredSubjects = this.commentSearchModel.immediateOwnerSourceKey > 0 ? this.filteredSubjects.filter(x =>
      x.immediateOwnerSourceKey == this.commentSearchModel.immediateOwnerSourceKey) : this.filteredSubjects;

    //FILTER ON FROM DATE
    if (this.commentSearchModel.fromTs != null) {
      let fromDate: Date = new Date(this.commentSearchModel.fromTs);
      fromDate.setHours(0);
      fromDate.setMinutes(0);
      fromDate.setMilliseconds(0);

      var allFilteredSubjectKeys: number[] = [];
      //filter comments based on update time stamp
      this.filteredSubjects.forEach(subj => {

        var filteredComments = subj.comments.filter(
          x => Date.parse(x.updateTS) >= Date.parse(fromDate.toDateString()));
        if (filteredComments != null && filteredComments.length > 0) {
          allFilteredSubjectKeys.push(subj.subjectKey);
        }

      });
      //console.log('ALL FILTERED FROM SUBJECT KEYS: ', allFilteredSubjectKeys);
      this.filteredSubjects = this.filteredSubjects.filter(
        function (e) {
          return this.indexOf(e.subjectKey) >= 0;
        },
        allFilteredSubjectKeys
      );
    }

    //FILTER ON TO DATE
    if (this.commentSearchModel.toTs != null) {
      var allFilteredSubjectKeys: number[] = [];
      let toDate: Date = new Date(this.commentSearchModel.toTs);
      toDate.setHours(24);
      toDate.setMinutes(0);
      toDate.setMilliseconds(0);

      //filter comments based on update time stamp
      this.filteredSubjects.forEach(subj => {

        var filteredComments = subj.comments.filter(
          x => Date.parse(x.updateTS) <= Date.parse(toDate.toDateString()));
        if (filteredComments != null && filteredComments.length > 0) {
          allFilteredSubjectKeys.push(subj.subjectKey);
        }

      });
      //console.log('ALL FILTERED TO SUBJECT KEYS: ', allFilteredSubjectKeys);
      this.filteredSubjects = this.filteredSubjects.filter(
        function (e) {
          return this.indexOf(e.subjectKey) >= 0;
        },
        allFilteredSubjectKeys
      );
    }

    //FILTER ON PERSON NAME
    if(this.commentSearchModel.name != null && this.commentSearchModel.name.length > 0)
    {
      var allFilteredSubjectKeys: number[] = [];
      //filter comments based on update time stamp
      this.filteredSubjects.forEach(subj => {

        var filteredComments = subj.comments.filter(
          x => x.person.name.toLowerCase().includes(this.commentSearchModel.name.toLowerCase()));
        if (filteredComments != null && filteredComments.length > 0) {
          allFilteredSubjectKeys.push(subj.subjectKey);
        }

      });
      //console.log('ALL FILTERED NAME SUBJECT KEYS: ', allFilteredSubjectKeys);
      this.filteredSubjects = this.filteredSubjects.filter(
        function (e) {
          return this.indexOf(e.subjectKey) >= 0;
        },
        allFilteredSubjectKeys
      );
    }

    //FILTER ON SUBJECT TITLE
    this.filteredSubjects = this.commentSearchModel.title != null
      && this.commentSearchModel.title.length > 0 ? this.filteredSubjects.filter(x =>
        x.subjectText.toLowerCase().includes(this.commentSearchModel.title.toLowerCase())) : this.filteredSubjects;

  }


  addSubjectClick(event) {
    if (event.detail > 0) {
      this.addSubject();
    }
  }



  addSubject() {
    this.showNew = true;
    this.displaySearchPanel = false;
  }

  cancel() {
    this.showNew = false;
  }

  saveSubject(subject) {
    this.showNew = false
    this.addSubjectEvent.emit(subject);
  }

  addComment(comment: Comment, subject: CommentSubject) {
    this.addCommentEvent.emit(this.createPayload(comment, subject));
  }

  editComment(comment: Comment, subject: CommentSubject) {
    this.editCommentEvent.emit(this.createPayload(comment, subject));
  }


  disableSearch() {
    const disableSrch = (this.showNew || this.displaySearchPanel);
    return (disableSrch) ? "disabled" : "";
  }

  private createPayload(comment: Comment, subject: CommentSubject) {
    let payload = new CommentSubject();
    payload.subjectKey = subject.subjectKey;
    payload.comments.push(comment);
    return payload;
  }

}
