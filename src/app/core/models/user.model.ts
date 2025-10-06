export interface LoginResponse {
    uid: string;
    role: string;
    email: string;
    full_name: string;
    imageUser?: string; // URL ของ avatar
    token?: string;     // ถ้า backend ส่ง token
    message?: string;   // ข้อความ error หรือ info
}
