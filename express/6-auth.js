'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser store and submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password
const server = express()
const port = process.env.PORT || 9000

server.get("/hello",(req,res) => {
        res.setHeader("content-type", "text/plain")
        res.status(200)
        res.send('accessible to everyone')
    }
)

server.get("/world",(req,res) => {
    
}
)

server.listen(port)


