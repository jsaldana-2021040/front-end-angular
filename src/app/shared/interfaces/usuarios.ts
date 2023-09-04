import { Roles } from "./roles";

export interface Usuarios {
  codUsuario: number;
  email: string;
  password: string;
  activo: boolean;
  rolCod: number;

  rol?: Roles
}