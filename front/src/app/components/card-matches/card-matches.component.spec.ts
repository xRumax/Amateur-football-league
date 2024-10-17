import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMatchesComponent } from './card-matches.component';

describe('CardMatchesComponent', () => {
  let component: CardMatchesComponent;
  let fixture: ComponentFixture<CardMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
