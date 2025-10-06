import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-userhome',
  imports: [Navbar],
  templateUrl: './userhome.html',
  styleUrl: './userhome.scss'
})
export class Userhome {
  uid: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // รับค่า uid จาก URL
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log('Admin UID:', this.uid);
  }
}
