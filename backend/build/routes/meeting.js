"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fields_1 = require("@validations/fields");
const meeting_1 = require("@helpers/meeting");
const router = (0, express_1.Router)();
router.get('/:id', async (req, res) => {
    try {
        const data = await (0, meeting_1.getMeeting)(+req.params.id);
        res.status(200).json({ status: 200, meeting: data, message: 'Detalles de la reunion enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/lastMeeting', async (req, res) => {
    try {
        const data = await (0, meeting_1.getLastMeeting)();
        res.status(200).json({ status: 200, meeting: data, message: 'Ultimas reuniones enviadas' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/recentMeeting', async (req, res) => {
    try {
        const data = await (0, meeting_1.getRecentMeeting)();
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones recientes enviadas' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.get('/comments/:id', async (req, res) => {
    try {
        const data = await (0, meeting_1.getCommentsMeeting)(+req.params.id);
        res.status(200).json({ status: 200, comment: data, message: 'comentarios enviados' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/filter', fields_1.searchMettingFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const { titulo, horario } = req.body;
        const data = await (0, meeting_1.getFilterMeeting)({ titulo: titulo, horario: horario });
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/filterParticipate', fields_1.searchMettingFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const { titulo, horario } = req.body;
        const data = await (0, meeting_1.getFilterMeetingParticipates)({ titulo: titulo, horario: horario, cedula: req.user.cedula });
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/', fields_1.mettingFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const { asunto, descripcion, fecha, invitados } = req.body;
        if (invitados.indexOf(req.user.cedula) < 0) {
            invitados.push(req.user.cedula);
        }
        ;
        const data = await (0, meeting_1.insertMeeting)({ asunto: asunto, descripcion: descripcion, fecha_inicio: fecha, invitados: invitados });
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const data = await (0, meeting_1.culminateMeeting)(+req.params.id);
        res.status(200).json({ status: 200, meeting: data, message: 'reunion culminada' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/comments/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const data = await (0, meeting_1.commentMeeting)({ cedula: req.user.cedula, id: req.params.id, descripcion: descripcion });
        res.status(200).json({ status: 200, comment: data, message: 'comentario enviado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.post('/participates/:id', async (req, res) => {
    try {
        const data = await (0, meeting_1.insertParticipates)({ id: req.params.id, cedula: req.user.cedula });
        res.status(200).json({ status: 200, meeting: data, message: 'agregado participante' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
exports.default = router;
//# sourceMappingURL=meeting.js.map