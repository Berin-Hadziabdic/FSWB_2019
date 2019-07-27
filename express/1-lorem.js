'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html

const server = express()
const port = process.env.PORT || 8080

server.get("/lorem",(req,res) => {
        res.setHeader("content-type", "text/html")
        res.send('<!DOCTYPE html><html><body>lorem ipsum</body></html>')
    }
)

server.listen(port)