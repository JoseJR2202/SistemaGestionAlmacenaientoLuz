"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = __importDefault(require("./session"));
const users_1 = __importDefault(require("./users"));
// import file from './files';
const proyects_1 = __importDefault(require("./proyects"));
const auth_1 = require("@validations/auth");
const router = (0, express_1.Router)();
router.use('/session', session_1.default);
router.use('/users', auth_1.isAuth, users_1.default);
router.use('/proyects', auth_1.isAuth, proyects_1.default);
// router.use('/file',isAuth, file);
exports.default = router;
//# sourceMappingURL=index.js.map