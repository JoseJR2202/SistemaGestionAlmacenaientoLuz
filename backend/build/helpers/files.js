"use strict";
// import Pool from '@utils/pool';
// import { queriesPremisess, queriesProduct } from '@utils/queries';
// const pool = Pool.getInstance();
// export const fileProduct= async({url, id}:{url:string, id: number})=>{
//     const client = await pool.connect();
//     try {
//         await client.query('BEGIN');
//         const response = (await client.query(queriesProduct.SET_IMAGE,[url, id])).rowCount>0;
//         await client.query('COMMIT');
//         return response;
//     } catch (e) {
//         await client.query('CALLBACK');
//         console.log(e);
//         throw e;
//     } finally {
//         client.release();
//     }
// };
// export const filePremisses= async({url, id}:{url:string, id: number})=>{
//     const client = await pool.connect();
//     try {
//         await client.query('BEGIN');
//         const response = (await client.query(queriesPremisess.SET_IMAGE,[url, id])).rowCount>0;
//         await client.query('COMMIT');
//         return response;
//     } catch (e) {
//         await client.query('CALLBACK');
//         console.log(e);
//         throw e;
//     } finally {
//         client.release();
//     }
// };
//# sourceMappingURL=files.js.map