const router = require('express').Router();
const faker = require('faker');

const Produto = require('../models/produto');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-produto', (req, res) => {
  res.render('produtos/add-produto');
});

router.get('/gerar-dados', (req, res, next) => {
  for (let i = 0; i < 30; i++) {
    const produto = new Produto();
    produto.categoria = faker.commerce.department();
    produto.nome = faker.commerce.productName();
    produto.preco = faker.commerce.price();
    produto.imagem = faker.image.image();

    produto.save(err => {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect('/add-produto');
});

module.exports = router;
