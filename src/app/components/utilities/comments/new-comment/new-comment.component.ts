import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
  @Output('cancel') cancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('reply') replyEvent: EventEmitter<string> = new EventEmitter<string>();
  content = {
    cancelBtn: 'Cancel',
    addReplyBtn: 'Add Reply',
    characterCountLbl: 'Character Count',
    errors:{
      comment:{
        required:'A comment is required'
      }
    }
  }
  subjectForm: FormGroup;
  comment = new FormControl('',[Validators.required]);

  constructor() { }

  ngOnInit() {
    this.subjectForm = new FormGroup({
      comment:this.comment
    });
  }

  cancel(){
    this.cancelEvent.emit();
  }

  reply(){
    if(this.subjectForm.valid) {
      this.replyEvent.emit(this.comment.value);
    }
  }
}
