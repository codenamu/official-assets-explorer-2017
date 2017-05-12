//var express = require('express');
//var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/test', function(req, res, next) {
//   // res.render('index', { title: 'Test' });
//   res.send('adfa');
// });

//module.exports = router;
const officers = require('./officers');
const csv_assets = require('./csv_assets');
const summarys = require('./summarys');
const tengibles = require('./tengibles');
const tengible_estates = require('./tengible_estates');
const politicals = require('./politicals');
const financials = require('./financials');
const liabilitys = require('./liabilitys');

module.exports = {
  officers,
  csv_assets,
  summarys,
  tengibles,
  tengible_estates,
  politicals,
  financials,
  liabilitys
};
