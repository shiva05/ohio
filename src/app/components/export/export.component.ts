import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  dropdownSettings: any = {};

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  checkfile(uploadedFile) {
    const validExts = new Array('.xlsx', '.xls');
    let fileExt = uploadedFile.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    console.log(fileExt);
    if (validExts.indexOf(fileExt) < 0) {
      alert('Invalid file selected, valid files are of ' +
        validExts.toString() + ' types.');
      return false;
    } else {
      return true;
    }
  }

  import() {
    const uploadedFile = document.getElementById('excel-upload') || {};
    this.checkfile(uploadedFile);

    // TODO: write function
    console.log(uploadedFile);
    console.log('Import function ran');
  }
}
