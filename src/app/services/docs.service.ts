import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';
import { UtilsContext } from '../models/utils-context';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DocListDetail, DocListDetailRecord, DocType, DocState, DocDeleteRecords, DocDeleteRecord, DocImportRecords, UpdateDocumentStatus } from '../models/docs';

@Injectable()
export class DocsService {

    constructor(private http: AppHttpService) {
    }

    fetchDocs(utilsContext: UtilsContext) {
      // Check for 404 errors
      console.log('docs.service.fetchDocs()', environment.DOCS_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);

      return this.http.get(environment.DOCS_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);
    }

    
    fetchUiComponentPermissions(utilsContext: UtilsContext, childAssetTypeName: string) {
      
      return this.http.get(environment.DOCS_GET_PERMISSIONS_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&assetType=uicomp&childAssetTypeName=' + childAssetTypeName);
    }

    fetchDocStatuses(utilsContext: UtilsContext, docRelationInstanceKey: number) {
      // Check for 404 errors
      console.log('docs.service.fetchDocStatuses()', environment.DOCS_GET_STATUS_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&documentRelationInstanceKey=' + docRelationInstanceKey);

      return this.http.get(environment.DOCS_GET_STATUS_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&documentRelationInstanceKey=' + docRelationInstanceKey);
    }

    fetchDocCount(utilsContext: UtilsContext) {
      // Check for 404 errors
      console.log('docs.service.fetchDocCount()', environment.DOCS_COUNT_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);

      return this.http.get(environment.DOCS_COUNT_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);
    }

    fetchDocTypes(utilsContext: UtilsContext, type: string) {
      // Check for 404 errors
      // tslint:disable-next-line:max-line-length
      console.log('docs.service.fetchDocTypes()', environment.DOCS_GET_DOC_TYPES_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);

      return this.http.get(environment.DOCS_GET_DOC_TYPES_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey + '&detailKey=' +
        utilsContext.detailKey + '&type=' + type);
    }

    fetchFileTypes() {
      return this.http.get(environment.DOCS_GET_FILE_TYPES_API);
    }

    fetchDocHistory(documentRelationInstanceKey: number) {
      return this.http.get(`${environment.DOCS_GET_HISTORY_API}/documentRelationInstanceKey/${documentRelationInstanceKey}`)
    }

    fetchDocFile(utilsContext: UtilsContext, docKey: number) {
      return this.http.get(this.getDocumentFileUrlByDocKey(utilsContext, docKey));
    }

    fetchDocFileByUrl(utilsContext: UtilsContext, url: string) {
      const fileUrl = this.getDocumentFileUrl(utilsContext, url);

      return this.http.getFile(fileUrl);
    }

    deleteDocument(utilsContext: UtilsContext, docTypeKey: number, docKey: number) {
      // Update delete document flag; Delete document content if only 1 reference exists
      const docKeys = { docKey: docKey, docTypeKey: docTypeKey };
      // console.log('docs.deleteDocument() docKeys = ', docKeys);

      // tslint:disable-next-line:max-line-length
      const fileUrl = `${environment.DOCS_DELETE_API}/${docKey}/docType/${docTypeKey}/deleted?moduleKey=${utilsContext.moduleKey}&detailKey=${utilsContext.detailKey}&assetTemplateKey=${utilsContext.assetTemplateKey}`;
      // console.log('docs.deleteDocument() fileUrl = ', fileUrl);

      return this.http.put(fileUrl, docKeys);
    }

    deleteDocuments(utilsContext: UtilsContext, deletedDocs: DocDeleteRecords) {
      // Update delete document flag; Delete document content if only 1 reference exists
      // console.log('docs.deleteDocuments() deletedDocs = ', deletedDocs.documents);

      // tslint:disable-next-line:max-line-length
      const fileUrl = `${environment.DOCS_MULTI_DELETE_API}?moduleKey=${utilsContext.moduleKey}&detailKey=${utilsContext.detailKey}&assetTemplateKey=${utilsContext.assetTemplateKey}`;
      // console.log('docs.deleteDocuments() fileUrl = ', fileUrl);

      return this.http.put(fileUrl, deletedDocs);
    }

    importDocuments(utilsContext: UtilsContext, importedDocs: DocImportRecords) {
      // Update delete document flag; Delete document content if only 1 reference exists
      // console.log('docs.deleteDocuments() deletedDocs = ', deletedDocs.documents);

      // tslint:disable-next-line:max-line-length
      const fileUrl = `${environment.DOCS_IMPORT_API}?moduleKey=${utilsContext.moduleKey}&detailKey=${utilsContext.detailKey}&assetTemplateKey=${utilsContext.assetTemplateKey}`;
      // console.log('docs.deleteDocuments() fileUrl = ', fileUrl);

      return this.http.post(fileUrl, importedDocs);
    }

    updateDocumentStatus(utilsContext: UtilsContext, updateDocumentStatus: UpdateDocumentStatus) {
      console.log('Update Document Status API call: ' + updateDocumentStatus.documentRelationInstanceKey);
      console.log('Update Document Status API call: ' + updateDocumentStatus.documentStatusKey);
      const fileUrl = `${environment.DOCS_UPDATE_STATUS_API}?moduleKey=${utilsContext.moduleKey}&assetTemplateKey=${utilsContext.assetTemplateKey}`;
      
      return this.http.post(fileUrl, updateDocumentStatus);
    }

    // saveDocument() {

    // }

    getDocsToImport(utilsContext: UtilsContext) {
      // Check for 404 errors
      console.log('docs.service.getDocsToImport()', environment.DOCS_IMPORT_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);

      return this.http.get(environment.DOCS_IMPORT_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
      '&detailKey=' + utilsContext.detailKey);
    }

    getDocumentUploadUrl(utilsContext: UtilsContext, documentState: DocState) {
      let url = '';

      url = environment.DOCS_SAVE_API + '?moduleKey=' + utilsContext.moduleKey + '&detailKey=' + utilsContext.detailKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
        '&docType=' + documentState.docTypeKey + '&docTypeName=' + documentState.docDescription.split(' ').join('_');

      return url;
    }

    getDocumentFileUrlByDocKey(utilsContext: UtilsContext, docKey: number) {
      return `${environment.DOCS_GET_DOC_FILE_API}/${docKey}
        ?moduleKey=${utilsContext.moduleKey}&assetTemplateKey=${utilsContext.assetTemplateKey}&detailKey=${utilsContext.detailKey}`;
    }

    getDocumentFileUrl(utilsContext: UtilsContext, docUrl: string) {
      return `${docUrl}?moduleKey=${utilsContext.moduleKey}&assetTemplateKey=${utilsContext.assetTemplateKey}&detailKey=${utilsContext.detailKey}`;
    }
  }
