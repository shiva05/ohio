 import { FileUploader } from 'ng2-file-upload';

export interface FileDraggable {
  fileUploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  uploadUrl: string;
}

export class FileDraggableState implements FileDraggable {
  fileUploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  uploadUrl: string;
}
