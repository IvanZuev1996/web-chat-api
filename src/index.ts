import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/index';
import http from 'http';
import { Server } from 'socket.io';

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true
    },
    allowEIO3: true
});

io.on('connection', (socket) => {
    console.log('Connection...');

    socket.on('message', (data) => {
        io.emit('get-messages', data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnect...');
    });
});

app.use('/api', router());

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
