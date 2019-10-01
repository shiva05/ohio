import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentSubject } from 'src/app/models/comment-subject';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css']
})
export class NewSubjectComponent implements OnInit {
  @Output('save') saveEvent: EventEmitter<CommentSubject> = new EventEmitter<CommentSubject>();
  @Output('cancel') cancelEvent: EventEmitter<any> = new EventEmitter<any>();

  subjectForm: FormGroup;
  title = new FormControl('', [Validators.required]);
  comment = new FormControl('');

  content = {
    title: 'New Subject',
    cancelBtn: 'Cancel',
    addNewSubjectBtn: 'Add New Subject',
    characterCountLbl: 'Character Count',
    errors: {
      title: {
        required: 'A title is required'
      }
    }
  }

  subjectMaxLength: number = 500;
  commentMaxLength: number = 4000;

  constructor() { }

  ngOnInit() {
    this.subjectForm = new FormGroup({
      title: this.title,
      comment: this.comment
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }

  save(evt) {

    if (this.subjectForm.valid) {
      const subject = new CommentSubject();
      subject.subjectText = this.title.value;
      subject.commentText = this.comment.value;
      this.saveEvent.emit(subject);
    } else {
      for (let control in this.subjectForm.controls) {
        this.subjectForm.controls[control].markAsTouched();
      }
      this.subjectForm.updateValueAndValidity();
    }
  }
}
