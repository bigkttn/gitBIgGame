import { Component } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface Game {
  uid: string;
  title: string;
  type: string;
  price: number;
  releaseDate: string;
  imageUrl: string;
  description: string;
  imageFile?: File; // <--- เพิ่มบรรทัดนี้เข้ามา

}

@Component({
  selector: 'app-adgame',
  imports: [AdminNavbar, FormsModule,   // <-- ADD FormsModule here
    CommonModule],
  templateUrl: './adgame.html',
  styleUrl: './adgame.scss'
})

export class Adgame {

  uid: string | null = null;
  imagePreviewUrl: string | null = null; // *** เพิ่ม property สำหรับเก็บ URL ของภาพตัวอย่าง ***

  // เปลี่ยนชื่อเป็น newGame เพื่อให้สื่อความหมายมากขึ้น
  newGame: Game | null = null;

  constructor(private router: Router) { }
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0] && this.newGame) {
      const file = fileList[0];

      // 1. เก็บออบเจ็กต์ไฟล์ไว้ใน newGame
      this.newGame.imageFile = file;

      // 2. ใช้ FileReader เพื่ออ่านข้อมูลไฟล์และสร้างภาพ Preview
      const reader = new FileReader();
      reader.onload = () => {
        // ผลลัพธ์จะเป็น base64 string ซึ่งใช้แสดงรูปภาพได้
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void {
    // *** จุดที่เปลี่ยนแปลงสำคัญ ***
    // แทนที่จะค้นหาเกมจาก uid, เราจะสร้าง object เกมใหม่ที่ว่างเปล่าขึ้นมาเลย
    this.newGame = {
      uid: `game-${Date.now()}`, // สร้าง uid ชั่วคราว
      title: '',
      type: '',
      price: 0,
      releaseDate: '',
      imageUrl: '',
      description: ''
    };
  }

  onAddNewGame(): void {
    if (this.newGame) {
      // ในแอปจริง ส่วนนี้คือการส่งข้อมูล newGame ไปยัง Server/API เพื่อบันทึก
      console.log('✅ Adding new game:', this.newGame);
      // เมื่อบันทึกสำเร็จ อาจจะนำทางผู้ใช้กลับไปหน้ารายการเกม
      // this.router.navigate(['/admin/games']);
    }
  }

  onCancel(): void {
    console.log('❌ Add new game cancelled');
    // นำทางกลับไปหน้ารายการ
    // this.router.navigate(['/admin/games']);
  }
}
