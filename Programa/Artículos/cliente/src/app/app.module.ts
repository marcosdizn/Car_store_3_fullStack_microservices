import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { AppComponent } from './app.component';
import { CrearCocheComponent } from './components/crear-coche/crear-coche.component';
import { ListarCochesComponent } from './components/listar-coches/listar-coches.component';
import { BuscarCochesComponent } from './components/buscar-coches/buscar-coches.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearCocheComponent,
    ListarCochesComponent,
    BuscarCochesComponent
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
