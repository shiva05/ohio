import { Audience } from './audience';

export interface Organization {
    org_id: number;
    name: string;
    audiences: Audience[];
}
