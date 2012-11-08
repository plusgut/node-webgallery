#!/usr/bin/env node
var express = require('express');
var async   = require('async');

var fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/public'));

app.listen(7353);

app.get('/' , function(req, res) {
  res.sendfile('views/index.html');
});

app.get('/pics', function(req, res){
  var path = __dirname + '/pics';
  fs.readdir(path, function(err, files){
    if(err){
      res.send(500);
    } else{
       var newFiles = [];
       async.forEach(files, function(file, cb){
         if(file[0] != '.'){ 
          fs.readdir(path + '/' + file, function(err, pictures){
             if(err){
               cbb(err);
             } else{
               var gallerie = {title: file, picture: pictures[0]};
               newFiles.push(gallerie);
               cb();
             }
           });
         } else{
           cb();
         }
       }, function(err){
         if(err){
           res.send(500);
         } else{
           res.end(JSON.stringify(newFiles));
         }
       })
    }
  });
})

app.get('/pics/:galleryName', function(req, res){
  var path = __dirname + '/pics/' + req.params.galleryName 
  fs.exists(path, function(exists){
    if(exists){
      fs.readdir(path, function(err, files){
        if(err){
          res.send(500);
        } else{
          res.end(JSON.stringify(files));
        }
      })
    } else{
      res.send(404);
    }
  });
});

app.get('/pics/:galleryName/:pictureName', function(req, res){
  var path = __dirname + '/pics/' + req.params.galleryName + '/' + req.params.pictureName;
  fs.exists(path, function(exists){
    if(exists){
      res.sendfile(path);

    } else{
      res.send(404);
    }
  });
})
