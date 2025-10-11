import { Component, inject } from '@angular/core';
import { AuthService, Game, TypeGame } from '../../../core/auth/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-editgame',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbar],
  templateUrl: './editgame.html',
  styleUrl: './editgame.scss'
})
export class Editgame {
  currentGame: Game | null = null;
  originalImageUrl: string | null = null;
  newImagePreviewUrl: string | null = null;
  private selectedFile: File | null = null;
  isLoading = true;
  errorMessage = '';

  gameTypes: TypeGame[] = []; // ✅ Property นี้จะถูกเติมข้อมูล

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  // ✅ ปรับปรุง ngOnInit ให้โหลดข้อมูลทั้งหมดในที่เดียว
  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true;
      // 1. โหลดประเภทเกมทั้งหมดมาก่อน
      this.gameTypes = await this.authService.getGameTypes();

      // 2. ดึง ID ของเกมจาก URL
      const params = await firstValueFrom(this.route.params);
      const gameId = params['uid'];

      if (gameId) {
        // 3. โหลดข้อมูลของเกมที่จะแก้ไข
        const gameData = await this.authService.getGameById(gameId);
        this.currentGame = gameData;
        this.originalImageUrl = gameData.image || null;
      } else {
        throw new Error("Game ID not found in URL.");
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files[0]) {
      const file = element.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => { this.newImagePreviewUrl = reader.result as string; };
      reader.readAsDataURL(file);
    }
  }

  async onUpdateGame(): Promise<void> {
    if (!this.currentGame) return;

    const formData = new FormData();
    formData.append('game_id', this.currentGame.game_id.toString());
    formData.append('game_name', this.currentGame.game_name);
    formData.append('price', this.currentGame.price.toString());
    formData.append('description', this.currentGame.description || '');
    formData.append('type_id', this.currentGame.type_id?.toString() || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const result = await this.authService.updateGame(formData);
    if (result.ok) {
      alert('Game updated successfully!');
      this._navigateToAdminHome();
    } else {
      alert(`Error: ${result.message}`);
    }
  }

  onCancel(): void {
    this._navigateToAdminHome();
  }

  private _navigateToAdminHome(): void {
    const userRaw = localStorage.getItem('biggame_me');
    if (userRaw) {
      const user = JSON.parse(userRaw);
      const userId = user.uid;
      this.router.navigate(['/adminhome', userId]);
    } else {
      console.error("User data not found, navigating to login.");
      this.router.navigate(['/login']);
    }
  }
}
