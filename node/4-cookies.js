'use strict';

var http = require('http'); // do not change this line



// note: handling for the requests should be generic and your server should appropriately respond to any path, including ones not listed below

// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie
// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text
// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie
// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text
// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie


const port = 8080




const multiPlexer = (req, resp) =>
 {
  var cookie = req.headers

  if(cookie.cookie !== undefined)
  {
    var strCookie =  cookie.cookie.substr(7,cookie.cookie.length)
    resp.writeHead(200,{'Content-Type':"text/plain","Set-Cookie":"cookie="+req.url})
    resp.end("last time you visited \""  + strCookie + "\"")
  }
  else
  {
    resp.writeHead(200,{'Content-Type':"text/plain","Set-Cookie":"cookie="+req.url})
    resp.end("you must be new" )
  }
  
}



const server = http.createServer(multiPlexer)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
