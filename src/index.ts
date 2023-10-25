import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/index';

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/api', router());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
