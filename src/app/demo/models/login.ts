export interface LoginResponse {
    succeeded: boolean;
    errors?: string[];
    token?: String;    
}