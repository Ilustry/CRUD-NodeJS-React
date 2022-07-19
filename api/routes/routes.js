import express from 'express'
import produto from '../controller/produtoController.js'

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send("Api rodando!")
})

routes.get('/api/produtos', produto.findAll)
routes.post('/api/produtos', produto.create)
routes.put('/api/produtos/:id', produto.update)
routes.delete('/api/produtos/:id', produto.remove)
routes.get('/api/produtos/:id', produto.findById)

export { routes }