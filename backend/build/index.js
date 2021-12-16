"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/alias");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = require("@utils/strategies");
const app = (0, express_1.default)();
app.use('/files', express_1.default.static(__dirname + '/uploads'));
app.use(express_1.default.static(path_1.default.resolve('..', 'front', 'build')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: 'superkey',
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cors_1.default)());
passport_1.default.use(strategies_1.LocalStrategy);
passport_1.default.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});
passport_1.default.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api', routes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve('..', 'front', 'build', 'index.html'));
});
exports.default = app;
//# sourceMappingURL=index.js.map