import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEditProfileComponent } from './verify-edit-profile.component';

describe('VerifyEditProfileComponent', () => {
  let component: VerifyEditProfileComponent;
  let fixture: ComponentFixture<VerifyEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEditProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
