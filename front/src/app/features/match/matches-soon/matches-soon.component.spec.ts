import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesSoonComponent } from './matches-soon.component';

describe('MatchesSoonComponent', () => {
  let component: MatchesSoonComponent;
  let fixture: ComponentFixture<MatchesSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchesSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
