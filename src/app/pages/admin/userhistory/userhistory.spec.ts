import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userhistory } from './userhistory';

describe('Userhistory', () => {
  let component: Userhistory;
  let fixture: ComponentFixture<Userhistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userhistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userhistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
