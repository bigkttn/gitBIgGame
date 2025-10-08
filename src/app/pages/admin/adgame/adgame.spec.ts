import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adgame } from './adgame';

describe('Adgame', () => {
  let component: Adgame;
  let fixture: ComponentFixture<Adgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
