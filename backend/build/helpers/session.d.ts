import { UserComplete, RegisterUser } from '@interfaces/User';
export declare const getUserById: (cedula: number) => Promise<UserComplete>;
export declare const insertUser: (Usuario: RegisterUser) => Promise<RegisterUser>;
export declare const comparePassword: (candidate: any, hash: any) => Promise<unknown>;
//# sourceMappingURL=session.d.ts.map