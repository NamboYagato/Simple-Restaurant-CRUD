const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedidos')

// Getting all
router.get('/', async (req, res) => {
  try {
    const pedido = await Pedido.find()
    res.json(pedido)
  } catch (err) {
    res.status(500).json({ mensagem: err.mensagem })
  }
})

// Getting one
router.get('/:id', getPedidos, (req, res) => {
  res.json(res.pedido)
})

// Creating one
router.post('/', async (req, res) => {
  const pedido = new Pedido({
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    descricao: req.body.descricao,
    preco: req.body.preco,
    data: req.body.data,
    numPedido: req.body.numPedido
  })
  try {
    const newPedido = await pedido.save()
    res.status(201).json(newPedido)
  } catch (err) {
    res.status(400).json(({ mensagem: err.mensagem }))
  }
})

// Updating one
router.patch('/:id', getPedidos, async (req, res) => {
  if (req.body.nome != null) {
    res.pedido.nome = req.body.nome
  }
  if (req.body.quantidade != null) {
    res.pedido.quantidade = req.body.quantidade
  }
  if (req.body.descricao != null) {
    res.pedido.descricao = req.body.descricao
  }
  if (req.body.preco != null) {
    res.pedido.preco = req.body.preco
  }
  if (req.body.numPedido != null) {
    res.pedido.numPedido = req.body.numPedido
  }

  try {
    const pedidoAtualizado = await res.pedido.save()
    res.json(pedidoAtualizado)
  } catch (err) {
    res.status(400).json({ mensagem: err.mensagem })
  }
})

// Deleting one
router.delete('/:id', getPedidos, async (req, res) => {
  try {
    await res.pedido.deleteOne()
    res.json({ mensagem: "Pedido cancelado!" })
  } catch (err) {
    res.status(500).json({ mensagem: err.mensagem })
  }
})

async function getPedidos(req, res, next) {
  let pedido
  try {
    pedido = await Pedido.findById(req.params.id)
    if (pedido == null) {
      return res.status(404).json({ mensagem: "Não foi possível encontrar o pedido" })
    }
  } catch (err) {
    return res.status(500).json({ mensagem: err.mensagem })
  }
  res.pedido = pedido
  next()
}


module.exports = router