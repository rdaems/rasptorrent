var PirateBay = require('thepiratebay')
var http = require('http');
var pug = require('pug');
var Transmission = require('transmission')
var express = require('express')
var app = express()

app.get('/search/', (req, res) => search(req, res))

app.get('/download/', (req, res) => download(req, res))

app.listen(8080, () => console.log('app listens on port 8080'))

var transmission = new Transmission({
    port: 9091,
    host: '127.0.0.1',
    username: 'transmission',
    password: 'transmission'
});

function download(req, res) {
  //https://stackoverflow.com/questions/33000811/downloading-torrent-with-node-js
  console.log(req.query.magnet_uri)
  transmission.addUrl(req.query.magnet_uri, function(err, result) {
      if (err) {
          return console.log(err);
      }
      var id = result.id;
      console.log('Just added a new torrent.');
      console.log('Torrent ID: ' + id);
      Transmission.getTorrent(id);
  });
  res.redirect('localhost:9091')
}

function search(req, res) {
  PirateBay.search('Game of Thrones', {
    category: 205
  })
  .then(results => res.end(parse_results(results)))
  .catch(err => console.log(err))
  //res.write('Searching...')
}

function parse_results(results) {
  console.log(results)
  var html = pug.renderFile('template.pug', {'results': results});
  return html
}
