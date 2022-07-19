import React, { useEffect, useState } from "react";
import Axios from 'axios';

const obj = {
    nome: '',
    idFuncionario: 1,
    quantidade: '',
    valor: '',
    dataValidade: ''
}

let opt, id_atual

const ListaProdutos = () => {

    let [values, setValues] = useState(obj)

    const inputChange = e => {
        console.log(e.target)
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }


    const formEnvio = e => {
        if (opt === 'create') {
            Axios.post("http://localhost:3030/api/produtos", values).then(() => {
                setProductList([
                    ...productList,
                    {
                        nome: values.nome,
                        idFuncionario: 1,
                        quantidade: values.quantidade,
                        valor: values.valor,
                        dataValidade: values.dataValidade
                    }
                ])
            })
        }
        else if (opt === 'update') {
            productList[id_atual] = values
            Axios.put(`http://localhost:3030/api/produtos/${values.id}`, values).then(() => {
                setProductList(
                    productList
                )
                document.getElementById("btnSalvar").removeAttribute("data-bs-dismiss")
            })
        }
        e.preventDefault()
        setValues(obj)
    }

    let [productList, setProductList] = useState({})

    useEffect(() => {
        Axios.get("http://localhost:3030/api/produtos/").then((response) => {
            if (response) setProductList(response.data)
            else setProductList({})
        })
    }, [])

    const deleteProduct = key => {
        Axios.delete(`http://localhost:3030/api/produtos/${key}`).then(() => {
            setProductList(
                productList.filter((value) => {
                    return value.id !== key
                })
            )
        })
    }

    const createProduct = key => {
        setValues(obj)
        opt = 'create'
        document.getElementById("exampleModalLabel").innerHTML = "Cadastrar novo produto"
    }

    const updateProduct = key => {
        opt = 'update'
        document.getElementById("exampleModalLabel").innerHTML = "Atualizar produto"
        document.getElementById("btnSalvar").setAttribute("data-bs-dismiss", "modal")
        setValues(key[1])
        id_atual = key[0]
        console.log(key)
    }

    return (
        <div>

            <nav className="navbar navbar-light">
                <h1 style={{ color: "white" }}>Lista de Produtos</h1>
                <button type="button" onClick={createProduct} className="btn btn-primary rounded-pill float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + Adicionar novo
                </button>
            </nav>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrar novo produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form" onSubmit={formEnvio}>
                                <div className="row">
                                    <div className="mb-3 col-12">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Nome do produto</label>
                                        <input type="text" name='nome' value={values.nome} onChange={inputChange} className="form-control" id="exampleFormControlInput1" placeholder="Nome" />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Quantidade</label>
                                        <input type="number" name='quantidade' value={values.quantidade} onChange={inputChange} className="form-control" id="exampleFormControlInput1" placeholder="0" />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Valor</label>
                                        <div className="input-group">
                                            <span className="input-group-text">R$</span>
                                            <input type="number" name='valor' value={values.valor} onChange={inputChange} className="form-control" id="exampleFormControlInput1" placeholder="00.00" />
                                        </div>
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Data de validade</label>
                                        <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Validade"
                                            name='dataValidade' value={values.dataValidade} onChange={inputChange} />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Funcionário</label>
                                        <input className="form-control" type="text" value="Maria João" aria-label="Disabled input example" disabled />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="submit" id="btnSalvar" className="btn btn-primary" value="Reset">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Qnt.</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(productList).map(id => {
                                return (
                                    <tr key={id}>
                                        <th>{parseInt(id) + 1}</th>
                                        <td> {productList[id].nome} </td>
                                        <td> {productList[id].quantidade} </td>
                                        <td> {Number(productList[id].valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </td>
                                        <td>
                                            {/* <button className="btn btn-warning btn-rounded" onClick={() => updateProduct()}>
                                                </button> */}
                                            <div className="hstack gap-2">

                                                <i className="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { updateProduct([id, productList[id]]) }}>
                                                </i>
                                                <div className="vr">

                                                </div>
                                                {/* <button className="btn btn-danger btn-rounded" onClick={() => deleteProduct(productList[id].id)}>
                                                </button> */}
                                                <i className="fa-solid fa-trash" onClick={() => deleteProduct(productList[id].id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ListaProdutos