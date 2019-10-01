import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentSubject } from 'src/app/models/comment-subject';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css']
})
export class CommentsContainerComponent implements OnInit {
  //True if a user press a keyboard key like 'Enter' in this case 
  //'click' and a key press events are triggered. 
  private falseClick = false;
  @Input('subjects') subjects: CommentSubject[] = [];
  @Output('addSubject') addSubjectEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();
  @Output('addComment') addCommentEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();
  @Output('editComment') editCommentEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();

  content = {
    title: 'Comments',
    addNewSubjectBtn: 'Add New Subject'
  }

  showNew: boolean = false;

  constructor(private commentService: CommentsService) { }

  ngOnInit() {
  }

  /**
  * Checks if click event was initiated by mouse click or not
  * by checking detail property value which is always 0 when
  * click was triggered artificially. The problem here is that
  * when enter key is pressed then two events are going to happen
  * The first is 'click' event and the second is 'key' events. So, if you
  * want to set a focus after click to let say an input field then 'key' events' source
  * will be changed to a newly focused field which will trigger 'key' events handlers on it.
  * Which can lead to unexpected actions e.g. it might trigger an attempt of a form submition or a validation etc. 
  * @param event {Event} A DOM  event object
  */
  addSubjectClick(event) {
    if (event.detail > 0) {
      this.addSubject();
    }
  }

  addSubject() {
    this.showNew = true;
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

  private createPayload(comment: Comment, subject: CommentSubject) {
    let payload = new CommentSubject();
    payload.subjectKey = subject.subjectKey;
    payload.comments.push(comment);
    return payload;
  }
}
