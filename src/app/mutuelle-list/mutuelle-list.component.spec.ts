import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutuelleListComponent } from './mutuelle-list.component';

describe('MutuelleListComponent', () => {
  let component: MutuelleListComponent;
  let fixture: ComponentFixture<MutuelleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutuelleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutuelleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
