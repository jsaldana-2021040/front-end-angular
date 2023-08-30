import { Direcciones } from "./direcciones";
import { Empresas } from "./empresas";

export interface Personas {
  codPersona: number;
  nombres: string;
  apellidos: string;
  tieneVisa: boolean;
  activo: boolean;
  empresaCod: number;
  
  empresa?: Empresas;
  direcciones?: Direcciones[];
}