const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const indexRoutes = require('./routes');

// Conexão com banco de dados
mongoose
  .connect('mongodb://localhost/pagination-express', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Banco de dados conectado com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar banco de dados', err);
  });

// Configurações
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Rotas
app.use(indexRoutes);

// Arquivos estáticos

app.listen(app.get('port'), () => {
  console.log('Servidor rodando na porta', app.get('port'));
});
