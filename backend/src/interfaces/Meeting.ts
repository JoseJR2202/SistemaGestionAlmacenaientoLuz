export interface meeting{
    id_reunion?:number,
    asunto:string,
    descripcion:string,
    fecha_inicio:string,
    fecha_fin?:string,
    participantes?:number[],
    estado?:string
}

export interface listMeeting{
    asunto:string,
    fecha:string
}