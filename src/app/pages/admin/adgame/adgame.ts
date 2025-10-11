import { Component, inject } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth';
// ✅ ปรับแก้ Interface ให้ตรงกับ Backend
export interface Game {
  game_name: string;
  type_id: number | null;
  price: number;
  description: string;
  imageFile?: File;
  // ไม่ต้องมี uid, releaseDate, imageUrl แล้ว เพราะ Backend จัดการให้
}

@Component({
  selector: 'app-adgame',
  imports: [AdminNavbar, FormsModule,   // <-- ADD FormsModule here
    CommonModule],
  templateUrl: './adgame.html',
  styleUrl: './adgame.scss'
})

export class Adgame {
  imagePreviewUrl: string | null = null;
  newGame: Game | null = null;

  // ✅ inject AuthService และ Router
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    // สร้าง object เกมใหม่ที่ว่างเปล่า
    this.newGame = {
      game_name: '',
      type_id: null, // เริ่มต้นเป็น null
      price: 0,
      description: '',
    };
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0] && this.newGame) {
      const file = fileList[0];
      this.newGame.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ แก้ไขฟังก์ชัน onAddNewGame ทั้งหมด
  async onAddNewGame(): Promise<void> {
    if (!this.newGame || !this.newGame.game_name || this.newGame.type_id === null) {
      alert('Please fill in all required fields (Game Title, Type).');
      return;
    }

    // ดึงข้อมูล user ที่ login อยู่จาก localStorage
    const userRaw = localStorage.getItem('biggame_me');
    if (!userRaw) {
      alert('Error: You must be logged in to add a game.');
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(userRaw);
    const userId = user.uid;

    // สร้าง FormData object
    const formData = new FormData();
    formData.append('game_name', this.newGame.game_name);
    formData.append('price', this.newGame.price.toString());
    formData.append('description', this.newGame.description);
    formData.append('type_id', this.newGame.type_id.toString());
    formData.append('user_id', userId);

    // เพิ่มไฟล์รูปภาพถ้ามี
    if (this.newGame.imageFile) {
      formData.append('image', this.newGame.imageFile, this.newGame.imageFile.name);
    }

    // เรียกใช้ service เพื่อส่งข้อมูล
    console.log('Sending data to server...');
    const result = await this.authService.addGame(formData);

    if (result.ok) {
      alert('Game added successfully!');
      const userRaw = localStorage.getItem('biggame_me');
      if (userRaw) {
        const user = JSON.parse(userRaw);
        const userId = user.uid;

        // ✅ แก้ไขวิธีส่งพารามิเตอร์ตรงนี้
        // นำทางไป /adminhome/ ตามด้วยค่า userId
        this.router.navigate(['/adminhome', userId]);

      } else {
        // ถ้าไม่เจอ user ให้กลับไปหน้า login หรือหน้าหลัก เพราะไม่มี uid จะไปต่อ
        console.error("User data not found, cannot navigate to admin home.");
        this.router.navigate(['/login']);
      }
    } else {
      alert(`Error: ${result.message}`);
    }
  }

  // adgame.ts

  onCancel(): void {
    const userRaw = localStorage.getItem('biggame_me');
    if (userRaw) {
      const user = JSON.parse(userRaw);
      const userId = user.uid;

      // ✅ แก้ไขวิธีส่งพารามิเตอร์ตรงนี้
      // นำทางไป /adminhome/ ตามด้วยค่า userId
      this.router.navigate(['/adminhome', userId]);

    } else {
      // ถ้าไม่เจอ user ให้กลับไปหน้า login หรือหน้าหลัก เพราะไม่มี uid จะไปต่อ
      console.error("User data not found, cannot navigate to admin home.");
      this.router.navigate(['/login']);
    }
  }


}
