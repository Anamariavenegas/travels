import { Time } from "@angular/common";

export class VueloModelo{
    id?: String;
    fecha_inicio?: Date;
    hora_inicio?: Time;
    fecha_fin?: Date;
    hora_fin?: Time;
    asientos_vendidos?: number;
    nombre_piloto?: string;
    ruta?: string
  }