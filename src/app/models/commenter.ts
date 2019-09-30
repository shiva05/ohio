import { CommenterRole } from './commenter-role';

export interface Commenter {
    name: string;
    roles: CommenterRole[];
}