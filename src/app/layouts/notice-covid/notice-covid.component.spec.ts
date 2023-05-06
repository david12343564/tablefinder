import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCovidComponent } from './notice-covid.component';

describe('NoticeCovidComponent', () => {
  let component: NoticeCovidComponent;
  let fixture: ComponentFixture<NoticeCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
