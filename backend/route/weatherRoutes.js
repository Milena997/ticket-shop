var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:city', function(req, res, next) {
    const { city } = req.params;
  request({
    uri:  `https://goweather.herokuapp.com/weather/${city}`,

  }).pipe(res);
});

module.exports = router;