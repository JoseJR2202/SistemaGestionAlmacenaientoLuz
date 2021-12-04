export interface proyect {
    id_archivo?: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion: Date;
    url_archivo?: string;
    estado?: string;
    tipo_archivo?: string;
}
export interface detailProyect extends proyect {
    autores: string[];
}
export interface proyectFilter {
    titulo: string;
    escuela: string;
}
//# sourceMappingURL=Proyect.d.ts.map