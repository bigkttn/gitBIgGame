import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { AuthService } from '../../../core/auth/auth';
import { Getgame } from '../../../core/models/getgame';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-adminhome',
  imports: [AdminNavbar, RouterModule, CurrencyPipe, CommonModule
  ],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.scss'
})
export class Adminhome {
  uid: string | null = null;
  games: Getgame[] = []; // ✅ 6. สร้างตัวแปร games เป็น Array ว่าง

  // ✅ 7. Inject AuthService เข้ามาใน constructor
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  // ✅ 8. ทำให้ ngOnInit เป็น async เพื่อรอข้อมูล
  async ngOnInit(): Promise<void> {
    // รับค่า uid จาก URL (โค้ดเดิม)
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log('Admin UID:', this.uid);

    // ✅ 9. เรียกใช้ฟังก์ชัน getGames และเก็บข้อมูลลงในตัวแปร games
    this.games = await this.authService.getGames();
    console.log('Fetched Games:', this.games);
  }
  async onDeleteGame(gameId: number): Promise<void> {
    // 1. Ask for confirmation before deleting
    if (!confirm('Are you sure you want to delete this game?')) {
      return; // Stop if the user clicks "Cancel"
    }

    // 2. Call the deleteGame function from the service
    const result = await this.authService.deleteGame(gameId);

    if (result.ok) {
      alert(result.message); // Show success message
      // 3. Update the UI by removing the game from the local array
      // This avoids having to reload the entire page.
      this.games = this.games.filter(game => game.game_id !== gameId);
    } else {
      // Show error message if deletion fails
      alert(`Error: ${result.message}`);
    }
  }

}
