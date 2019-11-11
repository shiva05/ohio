import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { UploadFileService } from '../../services/upload-file.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/internal/operators/take';
import { AppState } from './../../app.state';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportComponent implements OnInit {
  dropdownSettings: any = {};
  uploadedFile: any;
  fileMissing = false;
  file1ToUpload: File = null;
  file2ToUpload: File = null;
  file3ToUpload: File = null;
  file4ToUpload: File = null;
  file5ToUpload: File = null;
  file6ToUpload: File = null;
  fileObject = {
    'DataFileTypeId': 0,
    'DataFileName': '',
    'File': []
  };
  ELA_uploadedFileName: any = 'Choose File';
  Math_uploadedFileName: any = 'Choose File';
  Social_uploadedFileName: any = 'Choose File';
  Science_uploadedFileName: any = 'Choose File';
  Course_uploadedFileName: any = 'Choose File';
  General_uploadedFileName: any = 'Choose File';
  utilsContext: any;
  importDataRequested = false;
  isVisible = false;
  subscription: Subscription;
  importStatus: any = ['Please wait', 'We are processign the import', 'Please wait for some more time', 'Please wait for some more time, Thank you for your patience.']
  importStatusMessageCount = 0;
  fileList: any = [];
  statusMessage: string;
  success: boolean;
  error: boolean;
  constructor(public uploadFileService: UploadFileService, private store: Store<AppState>) {
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.fileList = [];
    // this.dropdownSettings = {
    //  singleSelection: false,
    //  idField: 'item_id', textField: 'item_text',
    //  selectAllText: 'Select All',
    //  unSelectAllText: 'Unselect All',
    //  itemsShowLimit: 1,
    //  allowSearchFilter: true
    // };
    this.store.select('utilsState').subscribe((utilityState) => {
      this.utilsContext = utilityState.utilityContext;
    });
  }

  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 4000);
  }

  showSuccessAlert(): void {
    if (this.success) {
      return;
    }
    this.success = true;
    setTimeout(() => this.success = false, 4000);
  }

  showErrorMessage(): void {
    if (this.error) {
      return;
    }
    this.error = true;
    setTimeout(() => this.error = false, 6000);
  }

  getFileUploaded(files: FileList, id) {

    // this.fileObject = {
    //   'DataFileTypeId': 0,
    //   'DataFileName': '',
    //   'File': []
    // };
    // var duplicate = [];
    // duplicate = _.where(this.fileList, { DataFileTypeId: id });
    // this.fileObject.DataFileTypeId = id;
    // this.fileObject.DataFileName = event.target.files[0].name;
    // this.fileObject.File = event.target.files[0];

    switch (id) {
      case 1184:
        this.file1ToUpload = files.item(0);
        this.file1ToUpload['id'] = id;
        this.ELA_uploadedFileName = this.file1ToUpload.name;
        break;
      case 1185:
        this.file2ToUpload = files.item(0);
        this.file2ToUpload['id'] = id;
        this.Math_uploadedFileName = this.file2ToUpload.name;
        break;
      case 1186:
        this.file3ToUpload = files.item(0);
        this.file3ToUpload['id'] = id;
        this.Science_uploadedFileName = this.file3ToUpload.name;
        break;
      case 1187:
        this.file4ToUpload = files.item(0);
        this.file4ToUpload['id'] = id;
        this.Social_uploadedFileName = this.file4ToUpload.name;
        break;
      case 1188:
        this.file5ToUpload = files.item(0);
        this.file5ToUpload['id'] = id;
        this.Course_uploadedFileName = this.file5ToUpload.name;
        break;
      case 1189:
        this.file6ToUpload = files.item(0);
        this.file6ToUpload['id'] = id;
        this.General_uploadedFileName = this.file6ToUpload.name;
        break;
    }

    // if (duplicate.length > 0) {
    //   this.fileList.forEach(element => {
    //     if (element.DataFileTypeId == id) {
    //       element.DataFileName = event.target.files[0].name;
    //       element.File = event.target.files[0];
    //     }
    //   });
    // } else {
    //   this.fileList.push(this.fileObject);
    // }
    // console.log(this.fileList);
  }

  opensnack(text) {
    this.statusMessage = text;
    this.showAlert();
    if (this.importStatusMessageCount < this.importStatus.length - 1) {
      this.importStatusMessageCount = this.importStatusMessageCount + 1;
    } else {
      this.importStatusMessageCount = this.importStatus.length - 1;
    }
  }

  submitUploadedFiles() {
    let source = interval(10000);
    var filearray = [this.file1ToUpload, this.file2ToUpload, this.file3ToUpload, this.file4ToUpload, this.file5ToUpload, this.file6ToUpload]
    if (this.file1ToUpload === null || this.file2ToUpload === null || this.file3ToUpload === null || this.file4ToUpload === null || this.file5ToUpload === null || this.file6ToUpload === null) {

      this.statusMessage = 'Please select all six files to proceed with import.';
      this.showAlert();
    } else {
      this.subscription = source.subscribe(val => this.opensnack(this.importStatus[this.importStatusMessageCount]));
      this.importDataRequested = true;
      this.uploadFileService.SubmitFiles(filearray).subscribe(res => {
        this.subscription.unsubscribe();
        this.statusMessage = 'Your import process is successfully complete.';
        this.showSuccessAlert();
      }, err => {
        this.statusMessage = 'Something went wrong, please try again';
        this.importDataRequested = false;
        this.showErrorMessage();
        this.subscription.unsubscribe();
      });
    }
    // this.fileMissing = true;
    // if (this.fileList.length == 6) {
    //   this.uploadFileService.SubmitFiles(this.fileList, this.utilsContext).subscribe(res => {
    //     console.log('success');
    //   });
    // }
    // console.log('submited');
  }

  clearSelectedFiles() {
    this.fileMissing = false;
    (document.getElementById('ELA_uploadedFileName') as HTMLInputElement).value = '';
    (document.getElementById('Math_uploadedFileName') as HTMLInputElement).value = '';
    (document.getElementById('Science_uploadedFileName') as HTMLInputElement).value = '';
    (document.getElementById('Social_uploadedFileName') as HTMLInputElement).value = '';
    (document.getElementById('Course_uploadedFileName') as HTMLInputElement).value = '';
    (document.getElementById('General_uploadedFileName') as HTMLInputElement).value = '';

    this.ELA_uploadedFileName = 'Choose File';
    this.Math_uploadedFileName = 'Choose File';
    this.Social_uploadedFileName = 'Choose File';
    this.Science_uploadedFileName = 'Choose File';
    this.Course_uploadedFileName = 'Choose File';
    this.General_uploadedFileName = 'Choose File';

    this.fileList = [];
  }
}
