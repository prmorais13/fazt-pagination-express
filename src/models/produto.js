const { Schema, model } = require('mongoose');

const SchemaProduto = new Schema({
  categoria: { type: String },
  nome: { type: String },
  preco: { type: Number },
  imagem: { type: String }
});

module.exports = model('Produto', SchemaProduto);
