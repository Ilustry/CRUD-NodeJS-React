import ProdutoRepository from '../model/produtoModel.js'

async function findAll(req, res) {
    const produtos = await ProdutoRepository.findAll()
    res.send(produtos)
}

async function findById(req, res) {
    const produtos = await ProdutoRepository.findByPk(req.params.id)
    res.status(200).json(produtos)
}

async function create(req, res) {
    const body = req.body
    if(body.idFuncionario.length < 1 || body.nome.length < 1 || body.quantidade.length < 1 
        || body.valor.length < 1 || body.dataValidade.length < 1){
            return res.status(422).json({mensagem: "Produto não inserido."})
    }
    ProdutoRepository.create({
        idFuncionario: req.body.idFuncionario,
        nome: req.body.nome,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        dataValidade: req.body.dataValidade
    }).then((result) => {
        res.status(201).json({mensagem: "Produto inserido com sucesso.", result})
    })
}

async function update(req, res) {

    const produto = await ProdutoRepository.findByPk(req.params.id)

    if (!produto) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        })
    }

    await ProdutoRepository.update(
        {
            idFuncionario: req.body.idFuncionario,
            nome: req.body.nome,
            quantidade: req.body.quantidade,
            valor: req.body.valor,
            dataValidade: req.body.dataValidade
        },
        {
            where: {
                id: req.params.id
            }
        }
    )

    ProdutoRepository.findByPk(req.params.id).then(() => res.status(204).json())
}

async function remove(req, res) {
    await ProdutoRepository.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(204).json()
}

export default { findAll, create, update, remove, findById }