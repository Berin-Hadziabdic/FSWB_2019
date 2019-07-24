'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line
var port = 8080;
// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text



const multiPlexer = (req, resp) =>
 {
  var path = req.url
  path = path.substr(1, path.length)
  
  dns.lookup(path, null, (err, address, family) =>
    {
        resp.end(address)
    }
  )
  

}



const server = http.createServer(multiPlexer)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
