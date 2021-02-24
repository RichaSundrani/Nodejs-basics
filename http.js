const http = require('http');

//Create server object 
http.createServer((request, response)=>{
    // Write response
    response.write('Hello Richard Parkar'); 
    response.end();
}).listen(5000, ()=> console.log('Server running ... '));