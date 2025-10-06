export interface LoginResponse {
    uid: string;        // รหัสผู้ใช้
    role: string;       // สิทธิ์ของผู้ใช้ เช่น "user" หรือ "admin"
    email: string;      // อีเมลของผู้ใช้
    full_name: string;  // ชื่อเต็ม
    imageUser?: string; // URL หรือ path ของ avatar (optional)
    message?: string;   // ข้อความ response หรือ error (optional)
}
