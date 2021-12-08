import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { AeropuertosService } from 'src/app/servicios/aeropuertos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertosService: AeropuertosService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    coord_x: ['', [Validators.required]],
    coord_y: ['', [Validators.required]],
    siglas: [{value: '', disabled: true},'', [Validators.required]],
    tipo: ['', [Validators.required]],
  });
 
    id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.aeropuertosService.getWithId(id).subscribe((data: AeropuertoModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad)
      this.fgValidacion.controls["pais"].setValue(data.pais)
      this.fgValidacion.controls["coord_x"].setValue(data.coord_x)
      this.fgValidacion.controls["coord_y"].setValue(data.coord_y)
      this.fgValidacion.controls["siglas"].setValue(data.siglas)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
    })
  }

  edit(){
    let aeropuertos = new AeropuertoModelo();
    aeropuertos.id = this.fgValidacion.controls["id"].value;
    aeropuertos.nombre = this.fgValidacion.controls["nombre"].value;
    aeropuertos.ciudad = this.fgValidacion.controls["ciudad"].value;
    aeropuertos.pais = this.fgValidacion.controls["pais"].value;
    aeropuertos.coord_x = this.fgValidacion.controls["coord_x"].value;
    aeropuertos.coord_y = this.fgValidacion.controls["coord_y"].value;
    aeropuertos.siglas = this.fgValidacion.controls["siglas"].value;
    aeropuertos.tipo = this.fgValidacion.controls["tipo"].value;
 
    this.aeropuertosService.update(aeropuertos).subscribe((data: AeropuertoModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }



}
