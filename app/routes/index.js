const todosController = require('../controllers').todos;
const officersController = require('../controllers').officers;
const csvController = require('../controllers').csv_assets;
const summaryController = require('../controllers').summarys;
const tengiblesController = require('../controllers').tengibles;
const tengibleEstatesController = require('../controllers').tengible_estates;
const politicalsController = require('../controllers').politicals;
const financialsController = require('../controllers').financials;
const liabilitysController = require('../controllers').liabilitys;

module.exports = (app) => {
  //view routes
  app.get('/',function(req,res){
    res.render('index');
  });

  app.get('/test',function(req,res){
    return res.render('test', {
      title: 'test'
    });
  });
  
  //for insert data and update summary
  app.get('/upload',csvController.getView);
  app.post('/upload', csvController.create);
  app.post('/upload/:csv_year', csvController.create);
  app.post('/summary', csvController.summary);
  
  //api routes
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.get('/api/officers/:officer_id', officersController.retrieve);
  app.get('/api/officers', officersController.list);
  app.post('/api/officers', officersController.create);
  app.put('/api/officers/:officer_id', officersController.update);
  app.delete('/api/officers/:officer_id', officersController.destroy);
  
  app.get('/api/tengible_estate', tengibleEstatesController.list);
  app.post('/api/tengible_estate', tengibleEstatesController.create);
  
  app.get('/api/tengible', tengiblesController.list);
  app.post('/api/tengible', tengiblesController.create);
  
  app.get('/api/political', politicalsController.list);
  app.post('/api/political', politicalsController.create);
  
  app.get('/api/financial', financialsController.list);
  app.post('/api/financial', financialsController.create);
  
  app.get('/api/liability', liabilitysController.list);
  app.post('/api/liability', liabilitysController.create);
  
  app.get('/api/summary/:keyword', summaryController.retrieve);
  app.get('/api/summary/listById/:officer_id', summaryController.listById);
  app.get('/api/summary/:order_by/:keyword/:paging', summaryController.list);
  app.post('/api/summary', summaryController.create);
  app.get('/api/summary', summaryController.listByTotal);
};