import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaMesaComponent } from './nueva-mesa.component';

describe('NuevaMesaComponent', () => {
  let component: NuevaMesaComponent;
  let fixture: ComponentFixture<NuevaMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
