import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, MaxLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css']
})
export class MessageEditorComponent implements OnInit {
  //
  @Input('required') required: boolean = true;
  @Input('cancelBtnText') cancelBtnText: String;
  @Input('okBtnText') okBtnText: String;
  @Input('maxLength') maxLength: number;
  //An initial value for a message to edit if any.
  @Input('message') message: String = '';
  //An object that contains validation errors. A property name is name of a validator e.g required and
  //a value is an error message
  @Input('errors') errors: any;
  @Output('cancel') cancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('ok') okEvent: EventEmitter<string> = new EventEmitter<string>();

  subjectForm: FormGroup;
  messageControl: FormControl;

  content = {
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
    characterCountLbl: 'Character Count',
    errors: {
      required: "A field is required"
    }
  }

  constructor() { }

  ngOnInit() {
    this.content.errors = this.errors;
    this.messageControl = new FormControl(this.message ? this.message : '', this.required ? [Validators.required] : []);
    this.subjectForm = new FormGroup({
      messageControl: this.messageControl
    });
    this.cancelBtnText = this.cancelBtnText || this.content.cancelBtnText;
    this.okBtnText = this.okBtnText || this.content.okBtnText;
  }


  get charCount() {
    return this.maxLength - this.messageControl.value.length;
  }

  cancel() {
    this.cancelEvent.emit();
  }

  ok() {
    if (this.subjectForm.valid) {
      this.okEvent.emit(this.messageControl.value);
      this.messageControl.setValue("");
      this.messageControl.markAsPristine();
    } else {
      for (let control in this.subjectForm.controls) {
        this.subjectForm.controls[control].markAsTouched();
      }
      this.subjectForm.updateValueAndValidity();
    }
  }
}
