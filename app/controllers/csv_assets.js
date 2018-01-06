const HashMap = require('hashmap');
const fs = require('fs');
const multer = require('multer');
const csv = require("fast-csv");
const http = require('http');
const querystring = require('querystring');
const consts = require('./constants.js');
const summary = require('../models').summary;

var csv_datas = [];
var officer_hashs = new HashMap();

var tengible_assets = [];
var tengible_estate_assets = [];
var political_assets = [];
var financial_assets = [];
var liability_assets = [];

const storage = multer.diskStorage({   
    destination: './datas/',
    filename: function ( req, file, cb ) {
      const upload_file_name = req.body.csv_year+'_assets.csv';
      
      // fs.exists( './datas/'+upload_file_name, function(exists) {
      //   if(exists) {
      //     console.log('File['+upload_file_name+'] exists. Deleting now ...');
      //     fs.unlink('./datas/'+upload_file_name);
      //     // Error handling test
      //     // cb(new Error('I don\'t have a clue!'));
      //   }
          
      //   cb( null, upload_file_name);
      // });
    }
  }
);

const upload = multer({ storage: storage }).single('csv_file');

module.exports = {
  getView(req, res) {
    return res.render('upload', {
      title: 'Upload'
    });
  },create(req, res){
    console.log('uploading... : ' + req.params.csv_year);
    const csv_year = req.params.csv_year;
    
    if(csv_year !='' && csv_year !=2017 && csv_year !=null){
        upload(req, res, function(err){
          var stream = fs.createReadStream('./datas/'+csv_year+'_assets.csv');
          // var stream = fs.createReadStream('./datas/_test.csv');
          var csvStream = csv({ headers : true })
          .on("data", function(data){
            // arrange asset data to each tables;
            years = csv_year;
            csv_datas.push(arrangeTypeDats(data));
          })
          .on("end", function(){
            
            if(consts.START_INDEX < csv_datas.length){
              insertOfficerDatas(consts.START_INDEX);
            }
          });
        
          stream.pipe(csvStream);
        
          var result = '';
          var code = 0;
          if(err){
              result = 'Error is occured.[' + err + ']';
              code = 0;
          }else{
              result = 'File is uploaded'; 
              code = 1;
          }
          res.setHeader('Content-Type', 'application/json');
          res.json({'result': result, 'code': code});
      });
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.json({'result': 'Already uploaded', 'code': 1});
    }
  },summary(req, res){
    const csv_year = req.params.csv_year;
    getOfficerDatas(csv_year);
    res.setHeader('Content-Type', 'application/json');
    res.json({'result': 'Done', 'code': 1});
  }
};

function arrangeTypeDats(data){
  var asset_data = new Object();
  Object.keys(data).forEach(function (key) {
      if(key == consts.FIELD_ORGANIZATION){
        asset_data.organization =data[key];
      }else if(key == consts.FIELD_DIVISION){
        asset_data.division =data[key];
      }else if(key == consts.FIELD_JOB_TITLE){
        asset_data.job_title =data[key];
      }else if(key == consts.FIELD_NAME){
        asset_data.name =data[key];
      }else if(key == consts.FIELD_CATEGORY){
        asset_data.category =data[key];
        
        // 분류 - 부동산:1X, 현금성자산:2X, 주식:3X
        if(data[key] == consts.CATEGORY_ESTATE_BUILDING){
          asset_data.category = 11;
        }else if(data[key] == consts.CATEGORY_ESTATE_LAND){
          asset_data.category = 12;
        }else if(data[key] == consts.CATEGORY_TENGIBLE){
          asset_data.category = 13;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_GOLD){
          asset_data.category = 21;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_JEWEL){
          asset_data.category = 22;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_MEMBER){
          asset_data.category = 23;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_ANTIQUE){
          asset_data.category = 24;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_KNOWLEDGE){
          asset_data.category = 25;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_CASH){
          asset_data.category = 26;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_DEPOSIT){
          asset_data.category = 27;
        }else if(data[key] == consts.CATEGORY_POLITICAL){
          asset_data.category = 28;
        }else if(data[key] == consts.CATEGORY_TENGIBLE_KNOWLEDGE){
          asset_data.category = 29;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_STOCK){
          asset_data.category = 31;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_DEVENTURE){
          asset_data.category = 32;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_SHARE){
          asset_data.category = 33;
        }else if(data[key] == consts.CATEGORY_FINANCIAL_BOND){
          asset_data.category = 34;
        }else if(data[key] == consts.CATEGORY_LIABILITY){
          asset_data.category = 35;  
        }
      }else if(key == consts.FIELD_RELATION){
        asset_data.relation =data[key];
        switch (data[key]) {
          case consts.CATEGORY_RELATION_01:asset_data.relation=1;break;
          case consts.CATEGORY_RELATION_02:asset_data.relation=2;break;
          case consts.CATEGORY_RELATION_03:asset_data.relation=3;break;
          case consts.CATEGORY_RELATION_04:asset_data.relation=4;break;
          case consts.CATEGORY_RELATION_05:asset_data.relation=5;break;
          case consts.CATEGORY_RELATION_06:asset_data.relation=6;break;
          case consts.CATEGORY_RELATION_07:asset_data.relation=7;break;
          case consts.CATEGORY_RELATION_08:asset_data.relation=8;break;
          case consts.CATEGORY_RELATION_09:asset_data.relation=9;break;
          case consts.CATEGORY_RELATION_10:asset_data.relation=10;break;
          case consts.CATEGORY_RELATION_11:asset_data.relation=11;break;
          case consts.CATEGORY_RELATION_12:asset_data.relation=12;break;
          case consts.CATEGORY_RELATION_13:asset_data.relation=13;break;
          case consts.CATEGORY_RELATION_14:asset_data.relation=14;break;
          case consts.CATEGORY_RELATION_15:asset_data.relation=15;break;
          case consts.CATEGORY_RELATION_16:asset_data.relation=16;break;
          case consts.CATEGORY_RELATION_17:asset_data.relation=17;break;
          case consts.CATEGORY_RELATION_18:asset_data.relation=18;break;
          case consts.CATEGORY_RELATION_19:asset_data.relation=19;break;
          case consts.CATEGORY_RELATION_20:asset_data.relation=20;break;
          case consts.CATEGORY_RELATION_21:asset_data.relation=21;break;
          case consts.CATEGORY_RELATION_22:asset_data.relation=22;break;
          case consts.CATEGORY_RELATION_23:asset_data.relation=23;break;
          case consts.CATEGORY_RELATION_24:asset_data.relation=24;break;
          case consts.CATEGORY_RELATION_25:asset_data.relation=25;break;
          case consts.CATEGORY_RELATION_26:asset_data.relation=26;break;
          case consts.CATEGORY_RELATION_27:asset_data.relation=27;break;
          default:asset_data.relation=0;
        }
      }else if(key == consts.FIELD_TYPE_OF_PROPERTY){
        asset_data.type_of_property =data[key];
      }else if(key == consts.FIELD_DESCRIPTION){
        asset_data.description =data[key];
      }else if(key == consts.FIELD_PREVIOUS_PRICE){
        asset_data.previous_price =data[key];
      }else if(key == consts.FIELD_INCREASE_PRICE){
        asset_data.increase_price =data[key];
      }else if(key == consts.FIELD_INCREASE_DEAL_PRICE){
        asset_data.increase_deal_price = data[key];
        if(asset_data.increase_deal_price.trim().length == 0){
          asset_data.increase_deal_price = 0;  
        }
      }else if(key == consts.FIELD_DECREASE_PRICE){
        asset_data.decrease_price =data[key];
      }else if(key == consts.FIELD_DECREASE_DEAL_PRICE){
        asset_data.decrease_deal_price =data[key];
        if(asset_data.decrease_deal_price.trim().length == 0){
          asset_data.decrease_deal_price = 0;  
        }
      }else if(key == consts.FIELD_PRESENT_PRICE){
        asset_data.present_price =data[key];
      }else if(key == consts.FIELD_REASON_FOR_CHANGE){
        asset_data.reason_for_change =data[key];
      }
      
      asset_data.year_of_investigating = years;
      
  });  
  return asset_data;
}

function addAssetDatas(datas){
  switch(datas.category){
    case 11:tengible_estate_assets.push(datas);break;
    case 12:tengible_estate_assets.push(datas);break;
    case 13:tengible_assets.push(datas);break;
    case 21:tengible_assets.push(datas);break;
    case 22:tengible_assets.push(datas);break;
    case 23:tengible_assets.push(datas);break;
    case 24:tengible_assets.push(datas);break;
    case 25:tengible_assets.push(datas);break;
    case 26:financial_assets.push(datas);break;
    case 27:financial_assets.push(datas);break;
    case 28:political_assets.push(datas);break;
    case 31:financial_assets.push(datas);break;
    case 32:financial_assets.push(datas);break;
    case 33:financial_assets.push(datas);break;
    case 34:financial_assets.push(datas);break;
    case 35:liability_assets.push(datas);break;
  }
}

var officer_id;
var years;
var post_options = {
  hostname: 'official-assets-queza.c9users.io',
  port: 80,
  method: 'POST'
};

function insertOfficerDatas(index){
  const data = csv_datas[index];
  
  post_options.path ='/api/officers';
  post_options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(querystring.stringify(data))
  }
  
  if(typeof data == "undefined"){
    insertTengibleEstateDatas(consts.START_INDEX);  
  }
  else if(officer_hashs.get(data.organization+"|"+data.division+"|"+data.job_title+"|"+data.name)!=1){
    
    const req = http.request(post_options, (res) => {
      var result='';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        result += chunk;
      });
      res.on('end', () => {
        var row_id = JSON.parse(result).id;
        data.officer_id = row_id;
        officer_id = row_id;
        
        officer_hashs.set(data.organization+"|"+data.division+"|"+data.job_title+"|"+data.name, 1);
        if(index < csv_datas.length && index+1 != csv_datas.length){
        // if(index < 10){
          addAssetDatas(data);
          insertOfficerDatas(index+1);
        }else{
          console.log('Complete Officer Table.');
          insertTengibleEstateDatas(consts.START_INDEX);
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(querystring.stringify(data));
    req.end();
    }else{
      data.officer_id = officer_id;;
      addAssetDatas(data);
      insertOfficerDatas(index+1);
    }
}

function insertTengibleEstateDatas(index){
  if(0 < tengible_estate_assets.length){
    const postData = querystring.stringify(tengible_estate_assets[index]);
    post_options.path ='/api/tengible_estate';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
         
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < tengible_estate_assets.length && index+1 != tengible_estate_assets.length){
          console.log('Done '+'['+index+'].');
          insertTengibleEstateDatas(index+1);
        }else{
          console.log('Complete TengibleEstate Table.');
          insertTengibleDatas(consts.START_INDEX);
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }else{
    insertTengibleDatas(consts.START_INDEX);
  }
}

function insertTengibleDatas(index){
  if(0 < tengible_assets.length){
    const postData = querystring.stringify(tengible_assets[index]);
    post_options.path ='/api/tengible';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
         
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < tengible_assets.length && index+1 != tengible_assets.length){
          insertTengibleDatas(index+1);
        }else{
          console.log('Complete Tengible Table.');
          insertFinancialDatas(consts.START_INDEX);
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }else{
    insertFinancialDatas(consts.START_INDEX);
  }
}

function insertFinancialDatas(index){
  if(0 < financial_assets.length){
    const postData = querystring.stringify(financial_assets[index]);
    post_options.path ='/api/financial';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < financial_assets.length && index+1 != financial_assets.length){
          insertFinancialDatas(index+1);
        }else{
          console.log('Complete Financial Table.');
          insertPoliticalDatas(consts.START_INDEX);
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }else{
    insertPoliticalDatas(consts.START_INDEX);
  }
}

function insertPoliticalDatas(index){
  if(0 < political_assets.length){
    const postData = querystring.stringify(political_assets[index]);
    post_options.path ='/api/political';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
         
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < political_assets.length && index+1 != political_assets.length){
          insertPoliticalDatas(index+1);
        }else{
          console.log('Complete Polictical Table.');
          insertLiabilityDatas(consts.START_INDEX);
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }else{
    insertLiabilityDatas(consts.START_INDEX);  
  }
}

function insertLiabilityDatas(index){
  if(0 < financial_assets.length){
    const postData = querystring.stringify(liability_assets[index]);
    post_options.path ='/api/liability';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
         
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < liability_assets.length && index+1 != liability_assets.length){
          insertLiabilityDatas(index+1);
        }else{
          console.log('Complete Liability Table.');
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }
}


var get_options = {
  hostname: 'official-assets-queza.c9users.io',
  port: 80,
  path: '/api/officers',
  method: 'GET'
}

var summary_hashs;
var summary_keys;
function getOfficerDatas(csv_year){
  summary_hashs = new HashMap();
  summary_keys = [];
  get_options.path = '/api/officers/years/'+csv_year;
  
  var result='';       
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      var resultJson = JSON.parse(result);
      var summary_object;
      for(var i = 0; i < resultJson.length; i++){
        summary_object = new Object();
        summary_object.officer_id = resultJson[i].id;
        summary_object.organization = resultJson[i].organization;
        summary_object.division = resultJson[i].division;
        summary_object.job_title = resultJson[i].job_title;
        summary_object.name = resultJson[i].name;
        summary_object.year_of_investigating = resultJson[i].year_of_investigating;
        summary_object.totals = 0;
        summary_object.tengibles = 0;
        summary_object.tengible_estates = 0;
        summary_object.tengible_estate_amounts = 0;
        summary_object.financials = 0;
        summary_object.politicals = 0;
        summary_object.liabilitys = 0;
        summary_object.relations = 0;
        summary_object.fluctuates = 0;

        summary_keys.push(summary_object.officer_id);
        summary_hashs.set(summary_object.officer_id, summary_object);
      }
      getTengibleEstateDatas(csv_year);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function getTengibleEstateDatas(csv_year){
  get_options.path = '/api/tengible_estate/'+csv_year;
  var result='';       
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      createSummaryDatas(JSON.parse(result));
      getTengibleDatas(csv_year);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function getTengibleDatas(csv_year){
  get_options.path = '/api/tengible/'+csv_year;
  var result='';       
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      createSummaryDatas(JSON.parse(result));
      getFinancialDatas(csv_year);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function getFinancialDatas(csv_year){
  get_options.path = '/api/financial/'+csv_year;
  var result='';       
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      createSummaryDatas(JSON.parse(result));
      getPoliticalDatas(csv_year);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function getPoliticalDatas(csv_year){
  get_options.path = '/api/political/'+csv_year;
  var result='';
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      createSummaryDatas(JSON.parse(result));
      getLiabilityDatas(csv_year);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function getLiabilityDatas(csv_year){
  get_options.path = '/api/liability/'+csv_year;
  var result='';
  const req = http.request(get_options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      createSummaryDatas(JSON.parse(result));
      // console.log('*****************************************************************************');
      // console.log(summary_hashs);
      // console.log('*****************************************************************************');
      insertSummaryDatas(consts.START_INDEX);    
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write('');
  req.end();
}

function createSummaryDatas(resultJson){
  if(0 < resultJson.length){
    for(var i = 0; i < resultJson.length; i++){
      console.log('a'+resultJson.length);
      var summary_object = new Object();
      summary_object = summary_hashs.get(resultJson[i].officer_id);
      
      if(resultJson[i].category < 13){
        summary_object.tengible_estates += resultJson[i].present_price;
        summary_object.tengible_estate_amounts = summary_object.tengible_estate_amounts + 1;
      }else if(12<resultJson[i].category && resultJson[i].category < 26){
        summary_object.tengibles += resultJson[i].present_price;
      }else if(resultJson[i].category == 28){
        summary_object.politicals += resultJson[i].present_price;  
      }else if(25<resultJson[i].category && resultJson[i].category < 35){
        summary_object.financials += resultJson[i].present_price;  
      }else if(resultJson[i].category == 35){
        summary_object.liabilitys += resultJson[i].present_price;  
      }
      
      console.log('b');
      
      //총액
      summary_object.totals = summary_object.tengible_estates + summary_object.tengibles + summary_object.financials + summary_object.politicals + summary_object.liabilitys;
      
      //자녀 재산 
      if(8 < resultJson[i].relation){
        summary_object.relations += resultJson[i].present_price;  
      }
      
      console.log('c');
      
      // 전년도 대비
      summary_object.fluctuates += (resultJson[i].present_price - resultJson[i].previous_price);
      summary_hashs.set(summary_object.officer_id, summary_object);
      
      console.log('d');
    }  
  }
}


function insertSummaryDatas(index){
  if(0 < summary_keys.length){
    const postData = querystring.stringify(summary_hashs.get(summary_keys[index]));
    post_options.path ='/api/summary';
    post_options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
         
    const req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {});
      res.on('end', () => {
        if(index < summary_keys.length && index+1 != summary_keys.length){
          insertSummaryDatas(index+1);
        }else{
          console.log('Done***********************************************.');
        }  
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }
}