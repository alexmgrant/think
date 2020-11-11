import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();
export const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.use((req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;
