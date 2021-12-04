import { proyect, detailProyect, proyectFilter } from '@interfaces/Proyect';
export declare const getProyect: (id: number) => Promise<detailProyect>;
export declare const getProyectRecent: () => Promise<string[]>;
export declare const getProyectFilter: ({ titulo, escuela, facultad }: {
    titulo: string;
    escuela: string;
    facultad: string;
}) => Promise<proyectFilter[]>;
export declare const insertProyect: ({ titulo, descripcion, autor }: {
    titulo: string;
    descripcion: string;
    autor: number[];
}) => Promise<proyect>;
export declare const updateStateProyect: ({ id, estado }: {
    id: number;
    estado: string;
}) => Promise<boolean>;
//# sourceMappingURL=proyects.d.ts.map