import { RolesPermisos } from "./rolesPermisos";

export interface Roles {
  codRol: number,
  nombre: string,
  descripcion: string,
  activo: boolean,
  usuarioCreador: string,
  usuarioEditor: string,
  rolesPermisos: RolesPermisos[]
}