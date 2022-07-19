import express from 'express'
import bodyParser from 'body-parser'
import { routes } from './routes/routes.js'
import database from './config/database.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)


database.sync(() => console.log('Banco de dados conectado com sucesso!'))

app.listen(3030, () => {
    console.log('Servidor rodando na porta 3001')
})