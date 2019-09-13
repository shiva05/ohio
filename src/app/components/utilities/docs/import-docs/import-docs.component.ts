import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Docs, ImportDocs } from '../../../../models/docs';
import { AlertTypes } from '../../../../models/alerts';

@Component({
  selector: 'app-import-docs',
  templateUrl: './import-docs.component.html',
  styleUrls: ['./import-docs.component.css']
})
export class ImportDocsComponent implements OnInit {
  @Input() importDocsList: ImportDocs[];

  // @Input() alertType: AlertTypes;
  // @Input() alertMsg: string;
  
  @Output() doImportDocs = new EventEmitter<any>();
  @Output() hideImportDocs = new EventEmitter<any>();

  importDocs = [];
  selectedImportDocs: ImportDocs = null;
  enableDocImport: boolean = false;
  // displayImportZero: boolean = false;
  // displayImportConfirm: boolean = false;
  // docImportCount = 0;
  currentStyle = '';

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.importDocsList != null && this.importDocsList.length > 0) {
      this.importDocs = this.importDocsList.map((doc) => {
        
        return {
          ...doc,
          docFileNameDecoded: doc.docFileName.split('_').join(' '),
          docTypeNameDecoded: doc.docTypeName.split('_').join(' '),
        };
      });
    }
    else{
      this.importDocs = [];
    }

  }

  hide(){
    this.hideImportDocs.emit(true);
  }

  enableImport(event, docsAvailableToImport: ImportDocs[]){
    if (event.target.checked) {
      this.enableDocImport = true;
    }
    else{
      //Determine if any documents are selected
     
      this.selectedImportDocs = docsAvailableToImport.find(x => x.docSelected == true);
      if(this.selectedImportDocs == null)
      {
        this.enableDocImport = false;
      }
      
    }
  }

//   confirmImportDocs() {
    
//     this.docImportCount = this.importDocs.filter((doc) => {
//       return doc.docSelected;
//     }).length;
// console.log('import count: ' + this.docImportCount);
//     if (this.docImportCount > 0) {
//       // Display import confirmation message
//       this.displayImportConfirm = true;
//       this.displayImportZero = false;
//     } else {
//       // Display warning message that zero documents were selected for import
//       this.displayImportConfirm = false;
//       this.displayImportZero = true;
//     }

//     this.alertMsg = '';
//   }

  // hideImportDocMessages() {
  //   this.displayImportConfirm = false;
  //   this.displayImportZero = false;
  // }

  importingDocs() {
     const docsKeysToImport = this.importDocs.filter((doc) => {
      return doc.docSelected;
    }).map((doc) => {
      return { documentKey: doc.docKey, docTypeKey: doc.docTypeKey };
    });
    
    console.log(docsKeysToImport);
    this.doImportDocs.emit(docsKeysToImport);

    // Close UI message section for importing documents
    //this.hideImportDocMessages();
  }

  canImport()
  {
    return (this.enableDocImport) ? "" : "disabled";
  }
  
}
