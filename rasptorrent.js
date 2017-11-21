const PirateBay = require('thepiratebay')
const http = require('http');

http.createServer(function (req, res) {
  PirateBay.search('Game of Thrones', {
    category: 205
  })
  .then(results => res.end(parse_results(results)))
  .catch(err => console.log(err))
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Searching... \n');
}).listen(8080);

function parse_results(results) {
  console.log(results)
  n = results.length
  var output = ''
  for (i=0;i<n;++i) {
    result = results[i]
    name = result.name
    output += name + '\n'
  }
  return output
}
