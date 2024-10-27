import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUpdateComponent } from './match-update.component';

describe('MatchUpdateComponent', () => {
  let component: MatchUpdateComponent;
  let fixture: ComponentFixture<MatchUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
