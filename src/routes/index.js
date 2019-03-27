const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Paginação com Express versão 1.0.0');
});

module.exports = router;
