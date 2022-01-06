"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fields_1 = require("@validations/fields");
const proyects_1 = require("@helpers/proyects");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("@utils/multer"));
const auth_1 = require("@validations/auth");
const uploads = (0, multer_1.default)(multer_2.default);
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
router.delete('/:id', auth_1.isAdmin, async (req, res) => {
    try {
        // const proyect:detailProyect= await getProyect(+req.params.id);
        const data = await (0, proyects_1.deleteProyect)(+req.params.id);
        // if(data && proyect.url_archivo){
        //   await fs.unlink(`../uploads/${proyect.url_archivo}`);
        //   console.log('borrado');
        // }
        res.status(200).json({ status: 200, proyecto: data, message: 'Datos del proyecto borrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.post('/state', auth_1.isAdmin, async (req, res) => {
    try {
        const data = await (0, proyects_1.getProyectStatus)();
        res.status(200).json({ status: 200, proyecto: data, message: 'Datos de los proyectos enviados correctamente' });
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
router.post('/comments/user', async (req, res) => {
    try {
        console.log(req.user.cedula);
        const data = await (0, proyects_1.getCommentsUser)(req.user.cedula);
        res.status(200).json({ status: 200, comments: data, message: 'comentarios enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.get('/comments/user/proyects', auth_1.isValidate, async (req, res) => {
    try {
        console.log(req.user.cedula);
        const data = await (0, proyects_1.getCommentProyectByUser)(req.user.cedula);
        res.status(200).json({ status: 200, comments: data, message: 'comentarios enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/filter', fields_1.searchProyectFieldsValidation, fields_1.checkResult, async (req, res) => {
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
router.post('/', auth_1.isValidate, fields_1.proyectFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const { titulo, descripcion, autores } = req.body;
        const data = await (0, proyects_1.insertProyect)({ titulo: titulo, descripcion: descripcion, autor: autores });
        res.status(200).json({ status: 200, proyecto: data, message: 'Proyecto agregado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
router.put('/state/:id', auth_1.isAdmin, async (req, res) => {
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
router.put('/:id', uploads.single('file'), async (req, res) => {
    try {
        console.log(req.file?.filename);
        const resultado = await (0, proyects_1.updateUrlProyect)({
            url: req.file?.filename,
            id: +req.params.id
        });
        res.status(200).json({ status: 200, resultado: resultado, message: 'proyecto actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
exports.default = router;
//# sourceMappingURL=proyects.js.map