import { Audience } from './audience';

export interface Organization {
    Org_id: number;
    Name: string;
    Audiences: Audience[];
}
