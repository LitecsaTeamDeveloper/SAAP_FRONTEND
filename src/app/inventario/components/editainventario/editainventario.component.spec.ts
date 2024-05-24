import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditainventarioComponent } from './editainventario.component';

describe('EditainventarioComponent', () => {
  let component: EditainventarioComponent;
  let fixture: ComponentFixture<EditainventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditainventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditainventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
