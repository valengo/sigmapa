const express = require('express');
const router = express.Router();

/* GET main map page. */
router.get('/', function(req, res, next) {
    res.render('main-map', { name: 'Mapa principal' });
});

module.exports = router;
