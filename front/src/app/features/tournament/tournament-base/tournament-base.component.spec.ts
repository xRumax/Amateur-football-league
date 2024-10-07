import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBaseComponent } from './tournament-base.component';

describe('TournamentBaseComponent', () => {
  let component: TournamentBaseComponent;
  let fixture: ComponentFixture<TournamentBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TournamentBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
