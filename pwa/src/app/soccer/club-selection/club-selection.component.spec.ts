import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSelectionComponent } from './club-selection.component';

describe('ClubSelectionComponent', () => {
  let component: ClubSelectionComponent;
  let fixture: ComponentFixture<ClubSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
