export interface Personas {
  codPersona: number;
  nombres: string;
  apellidos: string;
  tieneVisa: boolean;
  activo: boolean;
  empresaCod: number;
  direcciones: [
    {
      codDireccion: number,
      direccion: string,
      zona: string,
      activo: boolean,
      personaCod: number
    }
  ]
}