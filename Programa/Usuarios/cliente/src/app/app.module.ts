import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
//Modulo para poder hacer las peticiones HTTP del Front-End al Back-End

//Componentes
import { AppComponent } from './app.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { BuscarUsuariosComponent } from './components/buscar-usuarios/buscar-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    ListarUsuariosComponent,
    BuscarUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
