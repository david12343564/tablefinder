import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResenaComponent } from './card-resena.component';

describe('CardResenaComponent', () => {
  let component: CardResenaComponent;
  let fixture: ComponentFixture<CardResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
