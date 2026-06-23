import express from 'express';
// import routes from "./routes/routes.ts"
import cors from 'cors'
// import 'dotenv/config'

const app = express();
const port = 8080;

app.use(cors({
    origin: '*'
}))

// routes(app)

app.get('/', (req, res) => {
    res.status(200).send({response : "Sucesso ao Carregar a pagina"})
})

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));