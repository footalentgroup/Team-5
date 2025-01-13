import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsTwoComponent } from './teams-two.component';

describe('TeamsTwoComponent', () => {
  let component: TeamsTwoComponent;
  let fixture: ComponentFixture<TeamsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
