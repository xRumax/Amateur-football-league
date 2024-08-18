import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersBaseComponent } from './players-base.component';

describe('PlayerBaseComponent', () => {
  let component: PlayersBaseComponent;
  let fixture: ComponentFixture<PlayersBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayersBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
