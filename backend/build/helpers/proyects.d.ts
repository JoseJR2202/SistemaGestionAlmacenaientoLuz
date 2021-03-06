import { proyect, detailProyect, proyectFilter } from '@interfaces/Proyect';
export declare const getProyect: (id: number) => Promise<detailProyect>;
export declare const getProyectRecent: () => Promise<object[]>;
export declare const getCommentProyect: (id: number) => Promise<any[]>;
export declare const getCommentProyectByUser: (id: number) => Promise<any[]>;
export declare const getCommentsUser: (CI: number) => Promise<any[]>;
export declare const getProyectFilter: ({ titulo, escuela, facultad }: {
    titulo: string;
    escuela: string;
    facultad: string;
}) => Promise<proyectFilter[]>;
export declare const getProyectStatus: () => Promise<{
    revision: {
        id: any;
        titulo: any;
        autor: any[];
        estado: any;
    }[];
    standby: {
        id: any;
        titulo: any;
        autor: any[];
        estado: any;
    }[];
}>;
export declare const insertProyect: ({ titulo, descripcion, autor }: {
    titulo: string;
    descripcion: string;
    autor: number[];
}) => Promise<proyect>;
export declare const deleteProyect: (id: number) => Promise<boolean>;
export declare const updateStateProyect: ({ id, estado }: {
    id: number;
    estado: string;
}) => Promise<boolean>;
export declare const commentProyect: ({ descripcion, id, cedula }: {
    descripcion: string;
    id: number;
    cedula: number;
}) => Promise<any>;
export declare const updateUrlProyect: ({ id, url }: {
    id: number;
    url: string;
}) => Promise<boolean>;
//# sourceMappingURL=proyects.d.ts.map