"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@validations/auth");
const middlewares_1 = require("@middlewares/middlewares");
const fields_1 = require("@validations/fields");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Aqui estan las cosas de login');
});
router.get('/logout', auth_1.isAuth, (req, res) => {
    req.logout();
    req.session.alias = null;
    res.json({ status: 200, message: 'Sesión finalizada.' });
});
router.post('/user', auth_1.isLogged, fields_1.loginFieldsValidation, fields_1.checkResult, middlewares_1.passportAuth);
exports.default = router;
//# sourceMappingURL=session.js.map