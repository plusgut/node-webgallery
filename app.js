#!/usr/bin/env node
var express = require('express');

var app = express();

app.listen(7353);

app.get('/' , function(req, res) {
  console.log("blub")
  res.end("blarg")
});

