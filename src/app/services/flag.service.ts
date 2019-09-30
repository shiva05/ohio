import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';
import { UtilsContext } from '../models/utils-context';

@Injectable()
export class FlagService {

    constructor(private http: AppHttpService) {
    }

    fetchFlags(utilsContext: UtilsContext) {
        return this.http.get(environment.FLAGS_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
        '&compOwnerSourceKey=' + utilsContext.detailKey);
    }

    fetchFlagsCount(utilsContext: UtilsContext) {
        return this.http.get(environment.FLAGS_COUNT_GET_API + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey +
        '&compOwnerSourceKey=' + utilsContext.detailKey);
    }

    addFlag(utilsContext: UtilsContext, flagKey: number) {
        var flagModel = { flagKey: flagKey, assetTemplateKey: utilsContext.assetTemplateKey, compOwnerSourceKey: utilsContext.detailKey, moduleKey: utilsContext.moduleKey };
        return this.http.post(environment.FLAGS_GET_API, flagModel);
    }

    removeFlags(utilsContext: UtilsContext, flagKey: number) {
        var flagModel = { flagKey: flagKey, assetTemplateKey: utilsContext.assetTemplateKey, compOwnerSourceKey: utilsContext.detailKey, moduleKey: utilsContext.moduleKey };
        return this.http.put(environment.FLAGS_GET_API, flagModel);
    }
}
