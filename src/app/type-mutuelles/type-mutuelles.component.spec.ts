import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMutuellesComponent } from './type-mutuelles.component';

describe('TypeMutuellesComponent', () => {
  let component: TypeMutuellesComponent;
  let fixture: ComponentFixture<TypeMutuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMutuellesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMutuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
