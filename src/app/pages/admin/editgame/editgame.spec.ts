import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editgame } from './editgame';

describe('Editgame', () => {
  let component: Editgame;
  let fixture: ComponentFixture<Editgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
