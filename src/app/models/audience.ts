import { Application } from './application';

export interface Audience {
    aud_id: number;
    name: string;
    Applications: Application[];
}
