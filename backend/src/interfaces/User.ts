export interface User {
  cedula:string,
  nombre: string,
  correo: string,
  tipo_usuario?:string,
  escuela?:string,
  facultad?:string
}

export interface RegisterUser {
  cedula:string,
  nombre: string,
  correo?: string,
  tipo_usuario:number,
  escuela?:number,
  clave: string;
}

export interface UserComplete extends User {
  clave?: string;
}
