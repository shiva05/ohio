import { Organization } from './organization';

export interface AuthResponse {
    jwt: string;
    orgs: Organization[];
}
