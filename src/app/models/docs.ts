export interface Docs {
    docKey: number;
    documentRelationInstanceKey: number;
    description: string;
    docTypeKey: number;
    docTypeName: string;
    docFileName: string;
    docPermission: string;
    docUploadDate: string;
    status: string;
    docUrl: string;
    docReviewed: boolean;
    docResponseType: string;
    docPreviewFlag: boolean;
    permission: Permission;
}

export interface Permission{
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  approve: boolean;
  authorizeChange: boolean;
}


export interface ImportDocs {
  docKey: number;
  docTypeKey: number;
  docTypeName: string;
  docFileName: string;
  docUploadDate: string;
  docSelected: boolean;
}

export interface DocumentStatusUpdate {
  documentStatuses: DocStatus[];
  currentStatus: string;
  authorizedToUpdate: boolean;
}

export interface DocStatus {
  documentStatusKey: number;
  documentStatusName: string;
  documentStatusSelected: boolean;
}

export interface UpdateDocumentStatus {
  documentStatusKey: number;
  documentRelationInstanceKey: number;
}

export interface DocumentHistory {
  personUpdated: string;
  status: string;
  updatePersonKey: number;
  updateTs: Date;
}

export interface DocFile {
  documentKey: number;
  docFolderKey: number;
  documentIdent: string;
  docTypeKey: number;
  fileTypeKey: number;
  description: string;
  docName: string;
  path: string;
  fileName: string;
  permission: string;
  docUploadDate: string;
}


export interface DocListDetail {
  docKey: number;
  docTypeKey: number;
  docFileName: string;
  docDescription: string;
  docUploadDate: string;
  docUrl: string;
  docSelected: boolean;
}

export interface DocType {
  docTypeKey: number;
  docTypeName: string;
  assetTemplateKey: number;
  assetCompositionKey: number;
  name: string;
  assetActionTypeKey: number;
  authorization: string;
  permission: string;
}

export class DocTypeRecord implements DocType {
  docTypeKey: number;
  docTypeName: string;
  assetTemplateKey: number;
  assetCompositionKey: number;
  name: string;
  assetActionTypeKey: number;
  authorization: string;
  permission: string;
}

export interface DocTypeLabelValue {
  label: string;
  value: number;
}

export class DocListDetailRecord {
  constructor(_docKey: number, _docTypeKey: number, _docFileName: string, _docDescription: string, _docUploadDate: string,
    _docUrl: string) {
    this.docKey = _docKey;
    this.docTypeKey = _docTypeKey;
    this.docFileName = _docFileName;
    this.docDescription = _docDescription;
    this.docUploadDate = _docUploadDate;
    this.docUrl = _docUrl;
    this.docSelected = false;
  }

  docKey: number;
  docTypeKey: number;
  docFileName: string;
  docDescription: string;
  docUploadDate: string;
  docUrl: string;
  docSelected: boolean;
}

export interface FileState {
  docTypeKey: number;
  parentAssetTemplateKey: number;
  docDescription: string;
  immediateOwnerSourceKey: number;
  immediateOwnerTypeKey: number;
  compositeOwnerSourceKey: number;
  compositeOwnerTypeKey: number;
  showFileDrop: boolean;
}

export class DocState implements FileState {
  docTypeKey: number;
  parentAssetTemplateKey: number;
  docDescription: string;
  immediateOwnerSourceKey: number;
  immediateOwnerTypeKey: number;
  compositeOwnerSourceKey: number;
  compositeOwnerTypeKey: number;
  showFileDrop: boolean;
}

export interface DocValidation {
  maxFileSizeMb: number;
  uploadMaxFileSize: number;
  uploadAllowedFileTypes: string[];
  uploadAllowedMimeTypes: string[];
  uploadDocumentMaxCount: number;
}

export class DocUploadValidation implements DocValidation {
  maxFileSizeMb: number;
  uploadMaxFileSize: number;
  uploadAllowedFileTypes: string[];
  uploadAllowedMimeTypes: string[];
  uploadDocumentMaxCount: number;
}

export interface FileType {
  fileTypeKey: number;
  fileTypeName: string;
  fileTypeDescript: string;
  mimeTypeName: string;
  previewFlag: boolean;
  fileExt: string;
}

export class DocFileType implements FileType {
  fileTypeKey: number;
  fileTypeName: string;
  fileTypeDescript: string;
  mimeTypeName: string;
  previewFlag: boolean;
  fileExt: string;
}

export interface DocDelete {
  documentKey: number;
  docTypeKey: number;
}

export class DocDeleteRecord implements DocDelete {
  documentKey: number;
  docTypeKey: number;
}

export class DocDeleteRecords {
  documents: DocDeleteRecord[];
}

export interface DocImport {
  documentKey: number;
  docTypeKey: number;
}

export class DocImportRecord implements DocImport {
  documentKey: number;
  docTypeKey: number;
}

export class DocImportRecords {
  documents: DocImportRecord[];
}
