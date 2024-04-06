import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Compra } from 'src/app/models/compra';
import { Coche } from 'src/app/models/coche';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})

export class ListarComprasComponent implements OnInit {
  listaForm: FormGroup;
  listCompras: Compra[] = [];
 
  usuario: Usuario = new Usuario("");
  opcion: string | null;
  texto: string | null;
  titulo = 'Listado de compras';
  id_usuario : string | null;
  id_compra: string | null;

  //ESTOS DE ABAJO ANADIDOS PARA ELIMINAR LA COMPRA
  cantidad_Restaurar:number;
  id_coche_Restaurar: string;
  listCoches: Coche[] = [];
  listCompraBorrar: Compra[] = [];

  constructor(private fb: FormBuilder, private router: Router, private _compraService: CompraService, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.listaForm = this.fb.group({
      id_usuario: ['', Validators.required],
    })
    this.opcion = this.aRouter.snapshot.paramMap.get('opcion');
    this.texto = this.aRouter.snapshot.paramMap.get('texto');
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');
    this.id_compra = this.aRouter.snapshot.paramMap.get('id');

    this.cantidad_Restaurar=0;
    this.id_coche_Restaurar="";
  }

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras() {
    
    
    if (this.id_usuario != null){

    this._compraService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
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
  if(this.id_compra!=null){//Si tiene ID eliminamos la compra
    this.eliminarCompra(this.id_compra);
  }
  
      if (this.opcion != null) //Cambiamos el título si es buscar
          this.titulo = 'Coches encontrados por ' + this.opcion + ':';

        if (this.opcion == 'id') { //Buscamos coches por id de compra
            this._compraService.getComprasPorId(this.texto).subscribe(data => {
              this.listCompras = data;
            }, error => {
              console.log(error);
            })
  
        } else if (this.opcion == 'NombreCliente') { //Buscamos coches por id de compra
          this._compraService.getComprasPorNombreCliente(this.texto).subscribe(data => {
            this.listCompras = data;
          }, error => {
            console.log(error);
          })

        } else  { //BUSCAMOS POR DEFECTO POR EL ID DEL USUARIO  (BOTON LISTAR COMPRAS)
          
          this._compraService.getComprasPorID_Usuario(this.id_usuario).subscribe(data => {
            this.listCompras = data;
          }, error => {
            console.log(error);
          })

          // POR SI QUEREMOS VER TODAS LAS COMPRAS DANDO IGUAL EL ID DE USUARIO METIDO (MIENTRAS SEA CLIENTE)
          // this._compraService.getCompras().subscribe(data => { 
          //   this.listCompras = data;
          // }, error => {
          //   console.log(error); 
          // }) 
        }
    }

    eliminarCompra(id: any) {

      this.id_compra=id;//EL PASADO POR PARAMETROS AHI ENCIMA

      this._compraService.getComprasPorId(id).subscribe(data => {//BUSCO LA COMPRA
        this.listCompraBorrar = data;
        this.cogerCoche();
      }, error => {
        console.log(error);
      })
    }

    cogerCoche(){

     
      this.id_coche_Restaurar= this.listCompraBorrar[0].id_coche;

      this._compraService.getCochesPorId(this.id_coche_Restaurar).subscribe(data => {//Busco el COCHE asociado a la compra
        this.listCoches = data;
        if (this.listCoches.length == 0)
        this.eliminarCompraFinal();
        else {
        this.cantidad_Restaurar= this.listCompraBorrar[0].cantidad + this.listCoches[0].cantidad;//LE DEVOLVEMOS SU CANTIDAD ORIGINAL

        this.reponerValoresCoche();
        }
      }, error => {      
        console.log(error);
      })
    
    }

    reponerValoresCoche(){

      const COCHE: Coche = {
        marca: this.listCoches[0].marca ,
        modelo:this.listCoches[0].modelo,
        potencia: this.listCoches[0].potencia,
        combustible:this.listCoches[0].combustible,
        traccion: this.listCoches[0].traccion,
        cantidad: this.cantidad_Restaurar,//CAMBIAMOS SU CANTIDAD EL RESTO IGUAL
        precio: this.listCoches[0].precio
      }
      
      this._compraService.editarCoche(this.id_coche_Restaurar, COCHE).subscribe(data => {//Edito el COCHE asociado a la compra
        this.toastr.info('El coche fue actualizado correctamente', 'Coche Actualizado');
        this.eliminarCompraFinal();
      }, error => {
        console.log(error);
      })
    }



    eliminarCompraFinal(){
      if(this.id_compra!=null){//Para que no salte el aviso de si es string | null

      this._compraService.eliminarCompra(this.id_compra).subscribe(data => {
        this.toastr.error('La compra fue eliminada correctamente', 'Compra Eliminada');
        this.router.navigate(['/listar-compras', this.id_usuario]);
      }, error => {
        console.log(error);
      })

     }

    }
  
}
