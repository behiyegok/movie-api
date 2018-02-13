var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res,next) {
  const veri = req.body;
  res.json(veri);
});

module.exports = router;
