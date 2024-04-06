import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Coche } from 'src/app/models/coche';
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/models/compra';

@Component({
  selector: 'app-comprar-coches',
  templateUrl: './comprar-coches.component.html',
  styleUrls: ['./comprar-coches.component.css']
})

export class ComprarCochesComponent implements OnInit {
  compraForm: FormGroup;
  titulo = 'Comprar coche';
  id_coche: string | null;//EL ID DEL COCHE
  id_usuario: string | null;
  usuario: Usuario = new Usuario("");
  listCoches: Coche[] = [];
  cantidad_AUX: number;
  id_coche_AUX: string ;//PARA METER EN EL OBJETO COMPRA
  id_usuario_AUX: string ;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _compraService: CompraService, private aRouter: ActivatedRoute) {
    
    this.compraForm = this.fb.group({
      id_usuario: ['', Validators.required],
      NombreCliente: ['', Validators.required],
      direccion: ['', Validators.required],
      cantidad: ['', Validators.compose([Validators.required, Validators.min(1)])],
    })
    this.id_coche = this.aRouter.snapshot.paramMap.get('id');//El que le paso desde comprar de listar
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');//El que le paso desde listar

    this.id_coche_AUX="";
    this.id_usuario_AUX="";

    this.cantidad_AUX=0;
    
  }

  ngOnInit(): void {
    this.esEditar();
  }

 
  esEditar() {
    if (this.id_usuario != null){//El ID metido en ID_usuario dentro de listar

      this._compraService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Cliente"){
          this.toastr.success('El rol de user es: Cliente puede realizar esta funcion');          
        }
        else{
          this.toastr.error('El rol de user es administrador, necesitas ser cliente'); 
          this.router.navigate(['/']);       
        }
        
      }, error => {
        this.toastr.error('ID no válido'); 
        console.log(error);
        this.router.navigate(['/']);
      });

    }
  }

  comprarCoche() {
    if (this.compraForm.get('id_usuario')?.value != null){//El ID metido en ID_usuario dentro de comprar
      this._compraService.getUsuariosPorId(this.compraForm.get('id_usuario')?.value).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Cliente"){
          this.toastr.success('El rol de user es: Cliente, puede realizar esta funcion'); 
          this.comprobarResto();                     
        }
        else{
          this.toastr.error('El rol de user es administrador, necesitas ser Cliente'); 
          this.router.navigate(['/']);       
        }
        
      }, error => {
        this.toastr.error('ID no válido');
        console.log(error);
        this.router.navigate(['/']);
      });

  }
  
}

comprobarResto(){   

    if (this.id_coche!=null){
      this._compraService.getCochesPorId(this.id_coche).subscribe(data => {
        this.listCoches = data;
        this.comprobarResto2();
      }, error => {
        console.log(error);
      })
    }
  }

  comprobarResto2(){
    if(this.compraForm.get('cantidad')?.value<=this.listCoches[0].cantidad){

    this.cantidad_AUX=this.listCoches[0].cantidad - this.compraForm.get('cantidad')?.value;

    const COCHE: Coche = {
      marca: this.listCoches[0].marca ,
      modelo: this.listCoches[0].modelo,
      potencia: this.listCoches[0].potencia,
      combustible: this.listCoches[0].combustible,
      traccion: this.listCoches[0].traccion,
      cantidad: this.cantidad_AUX,
      precio: this.listCoches[0].precio
    }

      // editar coche
    if (this.id_coche!=null){
      this._compraService.editarCoche(this.id_coche, COCHE).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.compraForm.reset();
      })
  }
  if((this.id_coche !=null) && (this.id_usuario!=null)){
    this.id_coche_AUX= this.id_coche;
    this.id_usuario_AUX= this.id_usuario;
  }
    const COMPRA: Compra = {
      NombreCliente: this.compraForm.get('NombreCliente')?.value ,
      direccion: this.compraForm.get('direccion')?.value,
      cantidad: this.compraForm.get('cantidad')?.value,
      coche: this.listCoches[0],
      usuario: this.usuario,
      id_coche: this.id_coche_AUX,
      id_usuario: this.id_usuario_AUX,
      
    }
  
        this._compraService.guardarCompra(COMPRA).subscribe(data => {
          this.toastr.success('La compra fue registrado correctamente', 'Coche Registrado');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.compraForm.reset();
          this.router.navigate(['/']);
          
        })


  }else{
      this.toastr.error('La cantidad introducida supera el límite máximo');
      this.router.navigate(['/']);
        
      }
  }


}
