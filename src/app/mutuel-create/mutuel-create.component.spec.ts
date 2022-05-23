import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutuelCreateComponent } from './mutuel-create.component';

describe('MutuelCreateComponent', () => {
  let component: MutuelCreateComponent;
  let fixture: ComponentFixture<MutuelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutuelCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutuelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
