import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsEditComponent } from './regions-edit.component';

describe('RegionsEditComponent', () => {
  let component: RegionsEditComponent;
  let fixture: ComponentFixture<RegionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
