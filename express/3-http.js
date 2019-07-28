'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

const server = express()
const port = process.env.PORT || 9000

server.get("/missing",(req,res) => {
        res.setHeader("content-type", "text/plain")
        res.status(404)
        res.send('your princess is in another castle')
    }
)

server.get("/redirect",(req,res) => {
    res.setHeader("content-type", "text/plain")
    res.status(302)
    res.redirect('/redirected')
}
)

server.get("/cache",(req,res) => {
    res.setHeader("content-type", "text/plain")
    res.setHeader("Cache-Control", "max-age=86400")
    res.send('cache this resource')
}
)

server.get("/cookie",(req,res) => {
    res.setHeader("content-type", "text/plain")
    res.setHeader("set-cookie", "hello=world")

    res.send('i gave you a cookie')
}
)

server.get("/check",(req,res) => {
    res.setHeader("content-type", "text/plain")
    res.status(200)

   if( req.headers.cookie !== undefined && req.headers.cookie.includes("hello"))
    res.send('yes')
   else
    res.send("no")
}
)






server.listen(port)