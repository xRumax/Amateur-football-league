import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBaseComponent } from './match-base.component';

describe('MatchBaseComponent', () => {
  let component: MatchBaseComponent;
  let fixture: ComponentFixture<MatchBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
