import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { UploadFileService } from '../../services/upload-file.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/internal/operators/take';
import { AppState } from './../../app.state';

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
  ELA_uploadedFileName : any = 'Choose File';
  Math_uploadedFileName: any = 'Choose File';
  Social_uploadedFileName: any = 'Choose File';
  Science_uploadedFileName: any = 'Choose File';
  Course_uploadedFileName: any = 'Choose File';
  General_uploadedFileName: any = 'Choose File';
  utilsContext: any;


  fileList: any = [];
  constructor(public uploadFileService: UploadFileService, private store: Store<AppState>) { }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.fileList = [];
    //this.dropdownSettings = {
    //  singleSelection: false,
    //  idField: 'item_id', textField: 'item_text',
    //  selectAllText: 'Select All',
    //  unSelectAllText: 'Unselect All',
    //  itemsShowLimit: 1,
    //  allowSearchFilter: true
    //};
    this.store.select('utilsState').subscribe((utilityState) => {
      this.utilsContext = utilityState.utilityContext;
    });
  }

  getFileUploaded(files: FileList,id) {

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

    switch (id){
      case 1184:
        this.file1ToUpload = files.item(0);
        this.file1ToUpload['id'] =id;
        this.ELA_uploadedFileName = this.file1ToUpload.name;
        break;
      case 1185:
      this.file2ToUpload = files.item(0);
      this.file2ToUpload['id'] =id;
      this.Math_uploadedFileName = this.file2ToUpload .name;
        break;
        case 1186:
        this.file3ToUpload = files.item(0);
        this.file3ToUpload['id'] =id;
        this.Science_uploadedFileName = this.file3ToUpload .name;
        break;
      case 1187:
      this.file4ToUpload = files.item(0);
      this.file4ToUpload['id'] =id;
      this.Social_uploadedFileName = this.file4ToUpload .name;
        break;
      case 1188:
      this.file5ToUpload = files.item(0);
      this.file5ToUpload['id'] =id;
      this.Course_uploadedFileName = this.file5ToUpload.name;
        break;
      case 1189:
      this.file6ToUpload = files.item(0);
      this.file6ToUpload['id'] =id;
      this.General_uploadedFileName =this.file6ToUpload .name;
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

  submitUploadedFiles() {
    var filearray =[this.file1ToUpload,this.file2ToUpload,this.file3ToUpload,this.file4ToUpload,this.file5ToUpload,this.file6ToUpload]
    this.uploadFileService.SubmitFiles(filearray).subscribe(res => {
           console.log('success');
       });
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
    this.ELA_uploadedFileName = 'Choose File';
    this.Math_uploadedFileName = 'Choose File';
    this.Social_uploadedFileName = 'Choose File';
    this.Science_uploadedFileName = 'Choose File';
    this.Course_uploadedFileName = 'Choose File';
    this.General_uploadedFileName = 'Choose File';
    this.fileList = [];
  }
}
