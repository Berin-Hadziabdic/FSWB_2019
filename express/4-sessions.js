'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line

// preface: use the express-session middleware with the memorystore session storage which should make this task rather easy

// http://localhost:8080/hello should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/test should return 'your history:\n  /hello' in plain text

// http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text

// http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

const server = express()
const port = process.env.PORT || 9000

server.use(
    session(
     {
        'store': new session.MemoryStore(),
        'history': '',
        'secret':'secret',
        'resave': false,
        'saveUninitialized': false,
        'cookie': { 'maxAge': 86400000}

     }
    )
)

server.get( /[/]/, (req,res) => {
        res.setHeader("content-type", "text/plain")
        res.status(200)

        if(req.session.history === undefined)
        {
            req.session.history = req.url
            res.end("you must be new")
        }
        else
        {
            var buffer = req.session.history
            req.session.history = req.session.history +  "\n  " + req.url

            res.end("your history:\n  " + buffer)

        }
    }
)




server.listen(port)