import { Permission } from './permission';
import { Owner } from './owner';
import { Commenter } from './commenter';

export class Comment implements Owner {
    public commentKey = 0;
    public commentText: string;
    public permission: Permission;
    public createTS: string;
    public updateTS: string;
    public updatePersonKey: number;
    public createPersonKey: number;
    public immediateOwnerTypeKey: number;
    public compositeOwnerTypeKey: number;
    public immediateOwnerSourceKey: number;
    public compositeOwnerSourceKey: number;
    public person: Commenter;
}