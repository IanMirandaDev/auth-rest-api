import 'dotenv/config';
import process from 'process';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server is running at port ${port}`));