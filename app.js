const http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  var url = "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

var port = process.env.PORT || 8080;
server.listen(port, function () {
  console.log("Server Start. port:" + port);
});