import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutuelShowComponent } from './mutuel-show.component';

describe('MutuelShowComponent', () => {
  let component: MutuelShowComponent;
  let fixture: ComponentFixture<MutuelShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutuelShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutuelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
