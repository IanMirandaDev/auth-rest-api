import 'dotenv/config';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => res.json('Hello world!!!'));

app.listen(port, () => console.log(`Server is running at port ${port}`));