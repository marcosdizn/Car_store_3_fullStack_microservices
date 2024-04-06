import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarCochesComponent } from './comprar-coches.component';

describe('ComprarCochesComponent', () => {
  let component: ComprarCochesComponent;
  let fixture: ComponentFixture<ComprarCochesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprarCochesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprarCochesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
