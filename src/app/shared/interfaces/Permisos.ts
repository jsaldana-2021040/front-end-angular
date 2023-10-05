import { Modulos } from "./modulos"

export interface Permisos {
  codPermiso: number,
  permiso: string,
  descripcion: string,
  activo: boolean,
  usuarioCreador: string,
  usuarioEditor: string,
  moduloCod: number

  modulo?: Modulos
}