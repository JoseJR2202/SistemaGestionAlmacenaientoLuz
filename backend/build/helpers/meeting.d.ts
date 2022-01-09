import { meeting, listMeeting } from '@interfaces/Meeting';
export declare const getMeeting: ({ id, cedula }: {
    id: number;
    cedula: number;
}) => Promise<meeting>;
export declare const getCommentsMeeting: (id: number) => Promise<any[]>;
export declare const getLastMeeting: () => Promise<listMeeting[]>;
export declare const getRecentMeeting: () => Promise<listMeeting[]>;
export declare const getFilterMeeting: ({ titulo, horario }: {
    titulo: string;
    horario: string;
}) => Promise<any[]>;
export declare const getFilterMeetingParticipates: ({ titulo, horario, cedula }: {
    titulo: string;
    horario: string;
    cedula: number;
}) => Promise<any[]>;
export declare const insertMeeting: ({ asunto, descripcion, fecha_inicio, cedula, invitados }: {
    asunto: string;
    descripcion: string;
    fecha_inicio: Date;
    cedula: number;
    invitados: number[];
}) => Promise<meeting>;
export declare const culminateMeeting: (id: number) => Promise<boolean>;
export declare const commentMeeting: ({ descripcion, id, cedula }: {
    descripcion: string;
    id: number;
    cedula: number;
}) => Promise<any>;
export declare const insertParticipates: ({ id, cedula }: {
    id: number;
    cedula: number;
}) => Promise<any>;
export declare const isParticipant: ({ id, cedula }: {
    id: number;
    cedula: number;
}) => Promise<boolean>;
export declare const startMeeting: (id: number) => Promise<boolean>;
//# sourceMappingURL=meeting.d.ts.map