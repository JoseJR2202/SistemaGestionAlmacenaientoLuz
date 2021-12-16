"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//import crypto from 'crypto';
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, '..', 'uploads'),
        filename(request, file, callback) {
            //const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${Date.now()}-${file.originalname}`;
            callback(null, fileName);
        }
    })
};
//# sourceMappingURL=multer.js.map