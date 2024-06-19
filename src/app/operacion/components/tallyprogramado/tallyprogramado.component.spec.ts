import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyprogramadoComponent } from './tallyprogramado.component';

describe('TallyprogramadoComponent', () => {
  let component: TallyprogramadoComponent;
  let fixture: ComponentFixture<TallyprogramadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TallyprogramadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TallyprogramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
