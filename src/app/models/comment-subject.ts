import { Comment } from './comment';
import { Owner } from './owner';
import { Commenter } from './commenter';

export class CommentSubject implements Owner {
    public subjectKey: number;
    public subjectText: string;
    public commentText: string;
    public comments: Comment[] = [];
    public createTs: string;
    public createPersonKey: number;
    public immediateOwnerTypeKey: number;
    public compositeOwnerTypeKey: number;
    public immediateOwnerSourceKey: number;
    public immediateOwnerSourceName: string;
    public compositeOwnerSourceKey: number;
    public person: Commenter;
    public assetTemplateKey: number = null;
    public moduleKey: number = null;
}

export class CommentResponseViewModel {
    public subjects: CommentSubject[];
    public sources: CommentSources[];
}

export class CommentSources {
    immediateOwnerName: string;
    immediateOwnerSourceKey: number;
}