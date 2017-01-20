#! /usr/bin/env node
const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      watch = require('watch'),
      fs = require('fs'),
      IndexWriter = require('./modules/indexWriter'),
      argv = require('minimist')(process.argv.slice(2));

let indexFile = null,
    config = null;

if (argv.c) {
  config = JSON.parse(fs.readFileSync(argv.c, 'utf-8'));
}

indexFile = new IndexWriter(`${config.watchFolder}/index.html`, 'utf8')

app.get('/', function(req, res, next){
  res.send(indexFile.getIndexContent());
});

app.use('/socket.io', express.static('./node-modules/socket.io-client/dist/'));
app.use('/scripts', express.static('./scripts'));
app.use(express.static(config.watchFolder));

watch.watchTree(config.watchFolder, function () {
  console.log(`a file was changed.`);
  io.emit('hot-reload');
});

http.listen(config.port, function(){
  console.log(`universal-hot-reload server listen ${config.port}`);
});
