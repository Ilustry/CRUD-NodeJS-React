import produtoService from "../service/produtoService.js";

async function findAll(req, res) {
    return produtoService.findAll(req, res)
}

async function create(req, res) {
    return produtoService.create(req, res)
}

async function update(req, res) {
    return produtoService.update(req, res)
}

async function remove(req, res) {
    return produtoService.remove(req, res)
}

async function findById(req, res) {
    return produtoService.findById(req, res)
}

export default { findAll, create, update, remove, findById }