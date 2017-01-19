const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      watch = require('watch'),
      IndexWriter = require('./modules/indexWriter');

let indexFile = new IndexWriter('./test_dir/index.html', 'utf8');


app.use('/socket.io', express.static('./node-modules/socket.io-client/dist/'));
app.use('/scripts', express.static('./scripts'));

app.get('/', function(req, res){
  res.send(indexFile.getIndexContent());
});

watch.watchTree(__dirname + '/test_dir/', function () {
  console.log(`a file was changed.`);
  io.emit('hot-reload');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
