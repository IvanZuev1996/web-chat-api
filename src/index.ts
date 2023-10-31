import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/index';
import http from 'http';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/errorHandler';

const port = 8000;
const app: Express = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use('/api', router());
app.use(errorHandler);

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

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
