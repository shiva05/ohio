import { Injectable } from '@angular/core';
import { UtilsContext } from '../models/utils-context';
import { environment } from '../../environments/environment';
import { AppHttpService } from './app-http.service';
import { CommentSubject } from '../models/comment-subject';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: AppHttpService) { }

  private setOwner(target: Owner, context: UtilsContext) {
    target.immediateOwnerSourceKey = context.assetTemplateKey;
    target.immediateOwnerTypeKey = 90;
    target.compositeOwnerSourceKey = context.detailKey;
    target.compositeOwnerTypeKey = context.moduleKey;
    return target;
  }

  private getCommonParameters(context: UtilsContext) {
    return {
      assetTemplateKey: context.assetTemplateKey,
      moduleKey: context.moduleKey
    };
  }

  getSubjects(context: UtilsContext) {
    const params = this.http.objectToParams(Object.assign(this.getCommonParameters(context), this.setOwner({
      immediateOwnerSourceKey: null,
      immediateOwnerTypeKey: null,
      compositeOwnerSourceKey: null,
      compositeOwnerTypeKey: null
    }, context)));
    return this.http.get(`${environment.COMMENT_SUBJECTS}?${params}`);
  }

  getSubjectsCount(context: UtilsContext) {
    const params = this.http.objectToParams(Object.assign(this.getCommonParameters(context), this.setOwner({
      immediateOwnerSourceKey: null,
      immediateOwnerTypeKey: null,
      compositeOwnerSourceKey: null,
      compositeOwnerTypeKey: null
    }, context)));

    return this.http.get(`${environment.COMMENT_SUBJECTS_COUNT}?${params}`);
  }

  addSubject(subject: CommentSubject, context: UtilsContext) {
    this.setOwner(subject, context);
    return this.http.post(environment.COMMENT_SUBJECTS, Object.assign(subject, this.getCommonParameters(context)));
  }

  addComment(subject: CommentSubject, context: UtilsContext) {
    const uri = environment.COMMENT_COMMENTS.replace('{subjectKey}', subject.subjectKey.toString());
    const comment = subject.comments[0];
    this.setOwner(comment, context);
    console.log("ADD COMMENT API CALL: ", comment);
    return this.http.post(uri, Object.assign(comment, this.getCommonParameters(context)));
  }

  updateComment(subject: CommentSubject, context: UtilsContext) {
    const uri = environment.COMMENT_COMMENTS.replace('{subjectKey}', subject.subjectKey.toString());
    const comment = subject.comments[0];
    this.setOwner(comment, context);
    console.log("UDPATE COMMENT API CALL: ", comment);
    return this.http.put(uri, Object.assign(comment, this.getCommonParameters(context)));
  }
}
