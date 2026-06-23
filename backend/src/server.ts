import express from 'express';
import cors from 'cors'
import routes from './api/routes/routes.js';
import connectDB from './infrastructure/database.js';
// import 'dotenv/config'

const app = express();
const port = 8080;

app.use(cors({
    origin: '*'
}))

connectDB()
routes(app)

app.get('/', (req, res) => {
    res.status(200).send({response : "Sucesso ao Carregar a pagina"})
})

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));