import './config/alias'
import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy } from '@utils/strategies';
import compression from 'compression';
import helmet from "helmet";
import * as http from 'http';
import * as socketio from 'socket.io';

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // No se deben comprimir las res[uestas si este encabezado está presente.
    return false;
  }
  // Recurrir a la compresión estándar
  return compression.filter(req, res);
};

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'"],
        "frame-ancestors": ["'self'"],
        "object-src":"'self'"
      },
    }
  })
);
app.use(compression({filter: shouldCompress, threshold: 0}))
app.use('/files', express.static(__dirname + '/uploads'));
app.use(express.static(path.resolve('..','front','build')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('..','front','build','index.html'))
});

//Comunicacion por socket
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();
io.attach(server,{ 
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});

const users = {};

const socketToRoom = {};

io.on('connection', (socket:socketio.Socket) => {
    socket.on("join room", (roomID:number) => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }

        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload:any) => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", (payload:any) => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('hide remote cam', (targetId:any) => {
        console.log(targetId)
        io.to(targetId).emit('hide cam');
    });

    socket.on('show remote cam', (targetId:any) => {
        console.log(targetId)
        io.to(targetId).emit('show cam')
    })

    socket.on('hide remote sound', (targetId:any) => {
      console.log(targetId)
      io.to(targetId).emit('hide sound');
    });

    socket.on('show remote sound', (targetId:any) => {
      console.log(targetId)
      io.to(targetId).emit('show sound')
    })

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left', socket.id)
    });

});

export default server;
