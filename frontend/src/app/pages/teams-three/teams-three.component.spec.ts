import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsThreeComponent } from './teams-three.component';

describe('TeamsThreeComponent', () => {
  let component: TeamsThreeComponent;
  let fixture: ComponentFixture<TeamsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
