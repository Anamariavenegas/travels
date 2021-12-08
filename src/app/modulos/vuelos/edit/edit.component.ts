import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vuelosService: VuelosService,
    private router: Router,
    private route: ActivatedRoute,
    private rutasService: RutasService,) { }
  
  listadoRutas: RutaModelo[] = []

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllRutas();
  }

  getAllRutas(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }


  buscarRegistro(id: string){
    this.vuelosService.getWithId(id).subscribe((data: VueloModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio)
      this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio)
      this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin)
      this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin)
      this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientos_vendidos)
      this.fgValidacion.controls["nombre_piloto"].setValue(data.nombre_piloto)
      this.fgValidacion.controls["ruta"].setValue(data.ruta)
    })
  }

  edit(){
    let vuelo = new VueloModelo();
    vuelo.id = this.fgValidacion.controls["id"].value;
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value;
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value;

    this.vuelosService.update(vuelo).subscribe((data: VueloModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
