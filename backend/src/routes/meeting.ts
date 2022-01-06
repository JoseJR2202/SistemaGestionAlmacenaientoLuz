import { Router } from 'express';
import { mettingFieldsValidation, searchMettingFieldsValidation, checkResult } from '@validations/fields';
import { listMeeting, meeting } from '@interfaces/Meeting';
import { getMeeting, getCommentsMeeting, getFilterMeeting, getFilterMeetingParticipates, getLastMeeting, getRecentMeeting, insertMeeting, commentMeeting, culminateMeeting, insertParticipates } from '@helpers/meeting';
import { isValidate } from '@validations/auth';

const router = Router();

router.get('/:id', async(req, res)=>{
    try {
        const data:meeting= await getMeeting(+req.params.id);
        res.status(200).json({ status: 200, meeting: data, message: 'Detalles de la reunion enviados' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/lastMeeting', async(req, res)=>{
    try {
        const data:listMeeting[]= await getLastMeeting();
        res.status(200).json({ status: 200, meeting: data, message: 'Ultimas reuniones enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/recentMeeting',async(req, res)=>{
    try {
        const data:listMeeting[]= await getRecentMeeting();
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones recientes enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.get('/comments/:id', isValidate, async(req, res)=>{
    try {
        const data= await getCommentsMeeting(+req.params.id);
        res.status(200).json({ status: 200, comment: data, message: 'comentarios enviados' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/filter', searchMettingFieldsValidation, checkResult, async(req, res)=>{
    try {
        const {titulo, horario}= req.body;
        const data= await getFilterMeeting({titulo:titulo, horario:horario});
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/filterParticipate', isValidate, searchMettingFieldsValidation, checkResult, async(req:any, res)=>{
    try {
        const {titulo, horario}= req.body;
        const data= await getFilterMeetingParticipates({titulo:titulo, horario:horario, cedula:req.user.cedula});
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/', isValidate, mettingFieldsValidation, checkResult, async(req:any, res)=>{
    try {
        const {asunto, descripcion, fecha, invitados}= req.body;
        console.log(invitados.indexOf(req.user.cedula.toString())<0)
        if(invitados.indexOf(req.user.cedula.toString())<0){
            invitados.push(req.user.cedula)
        };
        const data:meeting= await insertMeeting({asunto:asunto, descripcion:descripcion, fecha_inicio:fecha, invitados:invitados});
        res.status(200).json({ status: 200, meeting: data, message: 'reuniones enviadas' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.put('/:id', async(req, res)=>{
    try {
        const data:boolean= await culminateMeeting(+req.params.id);
        res.status(200).json({ status: 200, meeting: data, message: 'reunion culminada' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/comments/:id', isValidate, async(req:any, res)=>{
    try {
        const {descripcion}= req.body;
        const data= await commentMeeting({cedula:req.user.cedula, id:req.params.id, descripcion:descripcion});
        res.status(200).json({ status: 200, comment: data, message: 'comentario enviado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

router.post('/participates/:id', isValidate, async(req:any, res)=>{
    try {
        const data:boolean= await insertParticipates({id:req.params.id, cedula:req.user.cedula});
        res.status(200).json({ status: 200, meeting: data, message: 'agregado participante' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});

export default router;