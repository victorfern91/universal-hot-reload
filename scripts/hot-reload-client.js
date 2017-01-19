var socket = io();

function reload() {
    location.reload();
}

console.info("Universal-hot-reload plugin was loaded!")

socket.on('hot-reload', function(){
   reload();
 });
