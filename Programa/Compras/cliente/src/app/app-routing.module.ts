import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { ListarCochesComponent } from './components/listar-coches/listar-coches.component';
import { BuscarCochesComponent } from './components/buscar-coches/buscar-coches.component';
import { ComprarCochesComponent } from './components/comprar-coches/comprar-coches.component';
import { ListarComprasComponent } from './components/listar-compras/listar-compras.component';
import { BuscarComprasComponent } from './components/buscar-compras/buscar-compras.component';
import { EditarCompraComponent } from './components/editar-compra/editar-compra.component';

const routes: Routes = [//CAMBIAR BUSCAR COCHES A BUSCAR COMPRAS
  { path: '', component: ListarCochesComponent},
  { path: 'comprar-coches/:id/:id_usuario', component: ComprarCochesComponent},
  { path: 'buscar-coches/:id_usuario', component: BuscarCochesComponent},
  { path: 'buscar-coches/:id_usuario/:opcion/:texto', component: ListarCochesComponent},//ANADIDO

  { path: 'buscar-compras/:id_usuario', component: BuscarComprasComponent},
  { path: 'buscar-compras/:id_usuario/:opcion/:texto', component: ListarComprasComponent},//ANADIDO
  { path: 'editar-compra/:id/:id_usuario', component: EditarCompraComponent},
  { path: 'eliminar-compra/:id/:id_usuario', component: ListarComprasComponent},
  
  { path: 'listar-coches/:id_usuario', component: ListarCochesComponent}, //ANADIDO
  { path: 'listar-compras/:id_usuario', component: ListarComprasComponent}, //ANADIDO
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
