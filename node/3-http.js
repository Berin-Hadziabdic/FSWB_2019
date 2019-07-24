'use strict';

var http = require('http'); // do not change this line


const port = 8080


// I got this function from here: https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
function parseCookies (request) {
   var list = {},
       rc = request.headers.cookie;

   rc && rc.split(';').forEach(function( cookie ) {
       var parts = cookie.split('=');
       list[parts.shift().trim()] = decodeURI(parts.join('='));
   });

   return list;
}

const multiPlexer = (req, resp) =>
 {
  resp.writeHead(200,{'Content-Type':"text/plain"})
 
  if(req.url === "/missing")
  {
     resp.writeHead(404,{'Content-Type':"text/plain"})
     resp.end('your princess is in another castle')
  }
 else if(req.url === "/redirect")
 {
    
    resp.writeHead(302,{"Location": '/redirected'})
    resp.end()
 }
 else if(req.url === "/cache")
 {
    resp.writeHead(200,{'Content-Type':"text/plain",'Cache-Control':"max-age=86400"})    
    resp.end("cache this resource")
 }
 else if(req.url === "/check")
 {
    var cookies = req.headers.cookie

    resp.writeHead(200, {'Content-Type':"text/plain"})
    var cookiez = parseCookies(req)

    if(cookiez["hello"] !== undefined)
      resp.end("yes")
    else
      resp.end("no")

 }
 else if(req.url === "/cookie")
 {
    resp.writeHead(200,{'Content-Type':"text/plain",'Set-Cookie':"hello=world"})    
    resp.end("i gave you a cookie")
 }
 else
 {
    resp.writeHead(200,{'Content-Type':"text/plain"})
    resp.end('')
 }


  
}



const server = http.createServer(multiPlexer)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie