'use strict';

var express = require('express'); // do not change this line

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

const server = express()
const port = process.env.PORT || 8080

server.get("/",(req,res) => {
        res.setHeader("content-type", "text/plain")
        res.send('you have accessed the root')
    }
)

server.get(/test/, (req,res) => {
    var url = req.originalUrl
    url = url.split('/')


    res.setHeader("content-type", "text/plain")
    res.send('you have accessed ' +"\"" + url[2] +"\"" + " within test")
  }
)


function makeTable(params)
{
    var start = "<table border=\"1\">"
    var end =   "</table>"
    var trs = ""
    for(var param in params)
    {
        trs += "<tr><td>" + param + "</td>" + "<td>" + params[param] + "</td></td>"
    }

    return (start + trs + end)
}

server.get(/attributes/, (req,res) => {
    var url = req.originalUrl
    url = url.split('/')
    var params = req.query
    var table = makeTable(params)

    var start =  "<!DOCTYPE html><html><body>"
    var end =  "</body></html>"

    res.setHeader("content-type", "text/html")
    res.send(start + table + end)
  }
)

server.get("/unexpected", (req,res) => {
 
    res.send("")
  }
)


server.listen(port)