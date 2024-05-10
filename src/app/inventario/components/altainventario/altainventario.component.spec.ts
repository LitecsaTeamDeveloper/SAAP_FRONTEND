import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltainventarioComponent } from './altainventario.component';

describe('AltainventarioComponent', () => {
  let component: AltainventarioComponent;
  let fixture: ComponentFixture<AltainventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltainventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltainventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
