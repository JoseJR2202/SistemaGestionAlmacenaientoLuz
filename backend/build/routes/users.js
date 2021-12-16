"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("@helpers/users");
const fields_1 = require("@validations/fields");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { cedula, nombre, correo, tipo_usuario, escuela, facultad } = req.user;
        const data = {
            correo: correo,
            cedula: cedula,
            nombre: nombre,
            tipo_usuario: tipo_usuario,
            escuela: escuela
        };
        res.status(200).json({ status: 200, usuario: data, message: 'Perfil del usuario enviado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
    }
});
router.put('/changeKey', fields_1.updateUserFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const { clave } = req.body;
        const data = await (0, users_1.updateKeyUser)({ key: clave, id: req.user.cedula });
        res.status(200).json({ status: 200, usuario: data, message: 'Perfil actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map