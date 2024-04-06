import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCochesComponent } from './listar-coches.component';

describe('ListarCochesComponent', () => {
  let component: ListarCochesComponent;
  let fixture: ComponentFixture<ListarCochesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCochesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCochesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
