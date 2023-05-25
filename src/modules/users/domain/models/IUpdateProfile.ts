export interface IUpdateProfile {
    user_id: string;
    name: string;  
    email: string;
    old_password?: string;
    password?: string;
}