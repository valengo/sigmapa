var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Hello from index');
  res.render('index', { name: 'Início' });
});

module.exports = router;
