import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCochesComponent } from './buscar-coches.component';

describe('BuscarCochesComponent', () => {
  let component: BuscarCochesComponent;
  let fixture: ComponentFixture<BuscarCochesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarCochesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCochesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
