import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsCreateComponent } from './regions-create.component';

describe('RegionsCreateComponent', () => {
  let component: RegionsCreateComponent;
  let fixture: ComponentFixture<RegionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
