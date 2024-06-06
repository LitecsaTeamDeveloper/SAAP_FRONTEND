import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientotpComponent } from './movimientotp.component';

describe('MovimientotpComponent', () => {
  let component: MovimientotpComponent;
  let fixture: ComponentFixture<MovimientotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovimientotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovimientotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
