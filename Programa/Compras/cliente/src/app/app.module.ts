import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { AppComponent } from './app.component';
import { ListarCochesComponent } from './components/listar-coches/listar-coches.component';
import { BuscarCochesComponent } from './components/buscar-coches/buscar-coches.component';
import { ComprarCochesComponent } from './components/comprar-coches/comprar-coches.component';
import { ListarComprasComponent } from './components/listar-compras/listar-compras.component';
import { BuscarComprasComponent } from './components/buscar-compras/buscar-compras.component';
import { EditarCompraComponent } from './components/editar-compra/editar-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarCochesComponent,
    BuscarCochesComponent,
    ComprarCochesComponent,
    ListarComprasComponent,
    BuscarComprasComponent,
    EditarCompraComponent,
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
