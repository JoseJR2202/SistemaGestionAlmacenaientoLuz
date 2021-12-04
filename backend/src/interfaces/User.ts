export interface User {
  cedula:string,
  nombre: string,
  correo: string,
  tipo_usuario?:string,
  escuela?:string,
  facultad?:string
}

export interface UserComplete extends User {
  clave?: string;
}
