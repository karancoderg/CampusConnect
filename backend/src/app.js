import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.json({ ok: true, service: 'college-social-media' }));
app.use('/api', router);

// Basic 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
