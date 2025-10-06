import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  imports: [],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.scss'
})
export class Adminhome {
  uid: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // รับค่า uid จาก URL
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log('Admin UID:', this.uid);
  }
}
