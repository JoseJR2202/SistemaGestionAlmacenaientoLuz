"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyects_1 = require("@helpers/proyects");
const router = (0, express_1.Router)();
router.get('/recent', async (req, res) => {
    try {
        const data = await (0, proyects_1.getProyectRecent)();
        res.status(200).json({ status: 200, proyecto: data, message: 'Proyectos recientes enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const data = await (0, proyects_1.getProyect)(+req.params.id);
        res.status(200).json({ status: 200, proyecto: data, message: 'Datos del proyecto enviado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.get('/comments/:id', async (req, res) => {
    try {
        const data = await (0, proyects_1.getCommentProyect)(+req.params.id);
        res.status(200).json({ status: 200, comment: data, message: 'comentarios enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/filter', async (req, res) => {
    try {
        const { titulo, escuela, facultad } = req.body;
        console.log(titulo, escuela, facultad);
        const data = await (0, proyects_1.getProyectFilter)({ titulo: titulo, escuela: escuela, facultad: facultad });
        res.status(200).json({ status: 200, data: data, message: 'Proyectos filtrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, autor } = req.body;
        const data = await (0, proyects_1.insertProyect)({ titulo: titulo, descripcion: descripcion, autor: autor });
        res.status(200).json({ status: 200, proyecto: data, message: 'Proyecto agregado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.put('/state/:id', async (req, res) => {
    try {
        const { estado } = req.body;
        const data = await (0, proyects_1.updateStateProyect)({ id: +req.params.id, estado: estado });
        res.status(200).json({ status: 200, proyecto: data, message: data ? 'Proyecto actualizado correctamente' : 'No se actualizo ningun proyecto' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.post('/comments/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const data = await (0, proyects_1.commentProyect)({ cedula: req.user.cedula, id: req.params.id, descripcion: descripcion });
        res.status(200).json({ status: 200, comment: data, message: 'comentario enviado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
exports.default = router;
//# sourceMappingURL=proyects.js.map