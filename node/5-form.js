'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text

const port = 8080
var messages = ["",""]



const multiPlexer = (req, resp) =>
 {

  querystring.parse(req.body)
   

  if(req.method === "POST")
  {
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
         body = body.split("&")
         body[0] = body[0].substr(5,1000)
         body[1] = body[1].substr(8,1000)
          var bslash = ""
         if(messages[0]!= "")
         {
            bslash="\n"
         }
         messages[0] += bslash + body[0] + ": " + body[1]
        
         resp.writeHead(200, {'Content-Type': 'text/plain'});  
         resp.end("thank you for your message")

    });
  }
  else if(req.url === "/form")
  {
    var cookie = req.headers
    resp.writeHead(200, {'Content-Type': 'text/html'});  
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<body>');
    resp.write('<form action="/new" method="post">');
    resp.write('<input type="text" name="name">');
    resp.write('<input type="text" name="message">');
    resp.write('<input type="submit" value="submit">');
    resp.write('</form>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
  }
  else if (req.url === "/list")
  {
    resp.writeHead(200, {'Content-Type': 'text/plain'});
    if(messages[0]=== "")  
      resp.write("")
    else
      {     
        resp.write(messages[0])
      }
    resp.end()
  }

}



const server = http.createServer(multiPlexer)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})