import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEditProfileComponent } from './alert-edit-profile.component';

describe('AlertEditProfileComponent', () => {
  let component: AlertEditProfileComponent;
  let fixture: ComponentFixture<AlertEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertEditProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
