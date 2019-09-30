import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentSubject } from 'src/app/models/comment-subject';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @Input('subject') subject: CommentSubject = new CommentSubject();
  @Output('reply') replyEvent: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output('editComment') editCommentEvent: EventEmitter<Comment> = new EventEmitter<Comment>();
  showReplies = false;
  commentMaxLength = 4000;
  focusOnReplies = false;

  content = {
    replyBtnText: 'Reply',
    comment: {
      errors: {
        required: 'A comment is required'
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

  get separatorAfterFirstComment(){
    return this.subject && this.subject.comments && this.subject.comments.length > 0;
  }

  showSeparator(isLast:boolean){
    return !isLast && this.subject && this.subject.comments &&this.subject.comments.length>1;
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
    this.focusOnReplies = !this.showReplies;
  }

  get showLastMessage() {
    return this.showReplies === false && this.subject.comments.length > 0;
  }

  reply(text) {
    let comment = new Comment();
    comment.commentText = text;
    this.replyEvent.emit(comment);
  }

  editComment(comment: Comment) {
    this.editCommentEvent.emit(comment);
  }

  isEditable(comment:Comment){
    return comment.permission.update;
  }
}
