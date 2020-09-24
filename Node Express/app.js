const express = require("express");
const http = require("http");
const morgan = require("morgan");
const app = express();
const port = 3000;
const hostname = 'localhost';

//This Morgan module is used to log the headers information --and after this we don't need to log req.headers (Line no. 15)
app.use(morgan('dev'));

//The express enables the application to route the static web pages which are stored in /public directory
app.use(express.static(__dirname + '/public'));
app.use((req, res)=>{

    //console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.send("<html><body><h1>Welcome To The Express App</h1></body></html>");

});

const server = http.createServer(app);

server.listen(port, hostname, (err)=>{
    if(err) console.log("ERROR: "+err);
    
    else{
        console.log("HTTP server is running on port "+port);
    }
});

