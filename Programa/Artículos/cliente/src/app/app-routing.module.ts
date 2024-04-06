import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { ListarCochesComponent } from './components/listar-coches/listar-coches.component';
import { CrearCocheComponent } from './components/crear-coche/crear-coche.component';
import { BuscarCochesComponent } from './components/buscar-coches/buscar-coches.component';

const routes: Routes = [
  { path: '', component: ListarCochesComponent},
  { path: 'crear-coche/:id_usuario', component: CrearCocheComponent},//ANADIDO
  { path: 'editar-coche/:id/:id_usuario', component: CrearCocheComponent},
  { path: 'eliminar-coche/:id/:id_usuario', component: ListarCochesComponent},
  { path: 'buscar-coches/:id_usuario', component: BuscarCochesComponent},
  { path: 'buscar-coches/:id_usuario/:opcion/:texto', component: ListarCochesComponent},//ANADIDO
  { path: 'listar-coches/:id_usuario', component: ListarCochesComponent}, //ANADIDO
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
