#!/usr/bin/env node
var express = require('express');
var async   = require('async');
var Canvas  = require('canvas');
var fs      = require('fs');

var app   = express();
var Image = Canvas.Image;

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
});

app.get('/thumbs/:galleryName/:width/:height/:pictureName', function(req, res){
  var parts = Array(__dirname, 'thumbs', req.params.galleryName, req.params.width, req.params.height, req.params.pictureName);
  var path = parts.join('/');
  fs.exists(path, function(exists){
    if(exists){
      res.sendfile(path);
    } else{
      var pathOrig = __dirname + '/pics/' + req.params.galleryName + '/' + req.params.pictureName;
      fs.exists(pathOrig, function(originalExists){//Checks if there is an original
        if(originalExists){
          var img = new Image;

          img.onerror = function(err){
            res.send(500);
          };

          img.onload = function(){
            var width  = parseFloat(req.params.width);
            var height = parseFloat(req.params.height);

            var canvas = new Canvas(width, height);
            var ctx    = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBuffer(function(err, buf){
              mkdir(path, function(){
                fs.writeFile(path, buf, function(err){
                  if(err){
                    res.send(500)
                  } else{
                    res.sendfile(path);
                  }
                });
              });
            });
          };

          img.src = pathOrig;
        } else{
          res.send(404);
        }
      });
    }
  });
});

function mkdir(path, cb, position){
  position = position || 0;
  var parts = path.split('/');
  if(position == parts.length - 2){
    cb();
  } else{ 
    var directory = parts.slice(0, position + 2).join('/');
    fs.exists(directory, function(exists){
      if(exists){
        mkdir(path, cb, ++position);
      } else{
        fs.mkdir(directory, function(err){
          if(err){
            cb(err);
          } else{
            mkdir(path, cb, ++position);
          }
        });
      }
    });
  }
}
