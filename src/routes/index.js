const router = require('express').Router();
const faker = require('faker');

const Produto = require('../models/produto');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-produto', (req, res) => {
  res.render('produtos/add-produto');
});

router.post('/add-produto', (req, res, next) => {
  const { categoria, nome, preco } = req.body;
  const produto = new Produto({
    categoria,
    nome,
    preco,
    imagem: faker.image.image()
  });

  produto.save(err => {
    if (err) return next(err);
    res.redirect('/add-produto');
  });
  // produto.categoria = categoria_nome;
  // produto.nome = produto_nome;
  // produto.preco = produto_preco;
  // produto.imagem = faker.image.image();
});

router.get('/produtos/:page', (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Produto.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, produtos) => {
      Produto.count((err, count) => {
        if (err) return next(err);
        console.log(count);
        res.render('produtos/list-produtos', {
          produtos,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
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
