import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaReservarComponent } from './mesa-reservar.component';

describe('MesaReservarComponent', () => {
  let component: MesaReservarComponent;
  let fixture: ComponentFixture<MesaReservarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaReservarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaReservarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
