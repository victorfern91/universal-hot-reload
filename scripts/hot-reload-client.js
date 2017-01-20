var socket = io();

function reload() {
    location.reload();
}

console.info('universal-hot-reload plugin was loaded!');

socket.on('hot-reload', function(){
   reload();
 });
