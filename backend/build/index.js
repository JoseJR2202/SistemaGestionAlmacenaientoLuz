"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const app = (0, express_1.default)();
const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        // No se deben comprimir las res[uestas si este encabezado está presente.
        return false;
    }
    // Recurrir a la compresión estándar
    return compression_1.default.filter(req, res);
};
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "script-src": ["'self'"],
            "frame-ancestors": ["'self'"],
            "object-src": "'self'"
        },
    }
}));
app.use((0, compression_1.default)({ filter: shouldCompress, threshold: 0 }));
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
//Comunicacion por socket
const server = http.createServer(app);
const io = new socketio.Server();
io.attach(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const users = {};
const socketToRoom = {};
io.on('connection', (socket) => {
    socket.on("join room", (roomID) => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        }
        else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });
    socket.on("sending signal", (payload) => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });
    socket.on("returning signal", (payload) => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });
    socket.on('hide remote cam', (targetId) => {
        console.log(targetId);
        io.to(targetId).emit('hide cam');
    });
    socket.on('show remote cam', (targetId) => {
        console.log(targetId);
        io.to(targetId).emit('show cam');
    });
    socket.on('hide remote sound', (targetId) => {
        console.log(targetId);
        io.to(targetId).emit('hide sound');
    });
    socket.on('show remote sound', (targetId) => {
        console.log(targetId);
        io.to(targetId).emit('show sound');
    });
    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left', socket.id);
    });
});
exports.default = server;
//# sourceMappingURL=index.js.map