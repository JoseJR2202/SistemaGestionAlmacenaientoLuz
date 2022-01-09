export interface meeting{
    id_reunion?:number,
    asunto:string,
    descripcion:string,
    fecha_inicio:string,
    fecha_fin?:string,
    participantes?:number[],
    estado?:string,
    admin?:boolean,
    inicio?:boolean
}

export interface listMeeting{
    asunto:string,
    fecha:string
}