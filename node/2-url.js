'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line



const port = 8080


function parseTableFromUrl(params)
{

    var paramDictionary = querystring.parse(params)
    var tableStart = '<table border="1"><tbody>'
    var tbody = ""
    var tableEnd   =  "</tbody></table>"
    for(var prop in paramDictionary)
    {
        tbody += "<tr>" + "<td>" + prop + "</td>" + "<td>" + paramDictionary[prop] + "</td>" + "</tr>" 
    }

    return (tableStart + tbody + tableEnd)
}



const multiPlexer = (req, resp) =>
 {
  resp.writeHead(200,{'Content-Type':"text/plain"})
 
  if(req.url === "/")
  {
     resp.writeHead(200,{'Content-Type':"text/plain"})
     resp.end('you have accessed the root')
  }
 else if(req.url.includes("/test"))
 {
    var str  = req.url.substring(6, req.url.length )
    resp.writeHead(200,{'Content-Type':"text/plain"})
    resp.end('you have accessed "' + str + '" within test')
 }
 else if(req.url.includes("/attributes"))
 {
    resp.writeHead(200,{'Content-Type':"text/html"})
    var urlTrimmed  = req.url.substring(12, req.url.length )
    var table = '<table border="1"></table>'

    if(urlTrimmed !== "")
        table = parseTableFromUrl(urlTrimmed)
    
    resp.end(table)
    
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

// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>