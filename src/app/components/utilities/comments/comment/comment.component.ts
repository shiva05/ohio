import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: Comment;
  @Input('showSeparator') showSeparator = true;
  @Input('editable') editable = true;
  @Input() expandDetail: boolean;
  @Output('edit') editEvent: EventEmitter<Comment> = new EventEmitter<Comment>();
  maxLength = 4000;
  showPersonDetails = false;
  showEditComment = false;
  content = {
    editBtn: 'Edit',
    createdBy: 'Created By',
    updatedBy: 'Updated By',
    updateBtnText: 'Update',
    errors: {
      required: 'A comment is required'
    }
  }

  constructor() { }

  ngOnInit() {
  }

  get lastChangedLabel() {
    return this.comment.updateTS ? this.content.updatedBy : this.content.createdBy;
  }

  get lastChanged() {
    return this.comment.updateTS ? this.comment.updateTS : this.comment.createTS;
  }

  togglePersonDetails() {
    this.showPersonDetails = !this.showPersonDetails;
  }

  toggleEditUI() {
    this.showEditComment = !this.showEditComment;
  }

  edit(newCommentText: string) {
    this.toggleEditUI();
    this.comment.commentText = newCommentText;
    this.editEvent.emit(this.comment);
  }
}
