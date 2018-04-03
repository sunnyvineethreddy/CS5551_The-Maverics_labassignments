var express = require('express');
const bodyParser= require('body-parser');
var assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
var db;
var app = express();
var router = express.Router();



app.use(bodyParser.urlencoded({extended: true}));
//app.use(app.router);
app.use(express.static(__dirname + '/'));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
  

MongoClient.connect('mongodb://vineeth:1234@ds231719.mlab.com:31719/lab5', (err, client) => {
    if (err) return console.log(err)
    db = client.db('lab5') 
    app.listen(3000,function(){
        console.log('listening on port 3000');
    });
  })


  const bodyMassIndex = require('body-mass-index');
  //console.log(bodyMassIndex('200 lb', '6ft 9in'));
  // => 21.4 

  var drugs = require('drugs');
 // console.log(drugs)



  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.post('/login',function(req,res){
  var cursor = db.collection('users').find({"username":req.body.username});
  cursor.each(function(err,doc) {
      assert.equal(err,null);
      if(doc != null)
      {
         if(doc.password == req.body.password){
           res.sendFile(__dirname + '/home.html');
         }else{
//          dialog.info('Hello there');
        } 
      }
  });
})

app.post('/register', function(req, res){
  console.log(req.body);
    db.collection('users').save(req.body, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({success:false,err:err})
        } 
    
        console.log('saved to database');
        //res.redirect('/');
     // res.sendFile(__dirname + '/index.html');
      res.status(200).send({success:true,message:"saved to database"})
      })

})

app.post('/neareststores', function(req, res){
    db.collection('sideeffects').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log(result)
      console.log('saved to database')
      // res.sendFile(__dirname + '/test.html');
	  res.send("data saved successfully")
    
    })

});

app.get('/drugseffects',function(req,res){
  var cursor = db.collection('sideeffects').find().toArray(function(err,result){
    if (err) return console.log(err)
    res.send(result)
  });
  
})

app.get('/drugslist',function(req,res){
    res.send(drugs);
})

app.post('/deleteData', function(req, res){
  console.log(req.body);
    var cursor = db.collection('sideeffects').find({"drugname":req.body.drugname});
    cursor.each(function(err,doc) {
      assert.equal(err,null);
      if(doc != null)
      {
        db.collection('sideeffects').deleteOne(doc, (error, data) => {
          if (error) {
            console.log(err);
            res.status(500).send({success:false,err:error})
          }else{
            console.log('removed to database'); 
           // res.sendFile(__dirname + '/home.html');
           res.send("deleted data successfully")
  
          } 
          
        })
      }
  });
    
})
