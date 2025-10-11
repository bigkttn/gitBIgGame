import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewhistory } from './viewhistory';

describe('Viewhistory', () => {
  let component: Viewhistory;
  let fixture: ComponentFixture<Viewhistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewhistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewhistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
