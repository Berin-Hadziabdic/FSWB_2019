'use strict';

var http = require('http'); // do not change this line

const port = 8080

const requestHandler = (req, resp) => {
  resp.writeHead(200,{'Content-Type':"text/html"})
  resp.end('<!DOCTYPE html><html><body>lorem ipsum</body></html>')
}

const server = http.createServer(requestHandler)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

// any request should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html