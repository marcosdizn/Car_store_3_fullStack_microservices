import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { BuscarUsuariosComponent } from './components/buscar-usuarios/buscar-usuarios.component';

const routes: Routes = [
 {path: '', component: ListarUsuariosComponent},
 {path: 'crear-usuario', component: CrearUsuarioComponent},
 {path: 'eliminar-usuario/:id/:id_usuario', component: ListarUsuariosComponent}, //El componente al que va el boton de editar desde listar-usuario.html
 {path: 'listar-usuarios/:id_usuario', component: ListarUsuariosComponent},
 {path: 'buscar-usuarios/:id_usuario', component: BuscarUsuariosComponent},
 {path: 'buscar-usuarios/:id_usuario/:opcion/:texto', component: ListarUsuariosComponent},//ANADIDO
 {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
