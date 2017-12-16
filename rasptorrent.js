var PirateBay = require('thepiratebay')
var http = require('http');
var pug = require('pug');
var Transmission = require('transmission')
var express = require('express')
var app = express()

app.get('/search/', (req, res) => search(req, res))

app.get('/download/', (req, res) => download(req, res))

app.listen(8081, () => console.log('app listens on port 8081'))

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
      res.redirect('http://192.168.1.27:9091')
  });
}

function search(req, res) {
  search_key = req.query.search
  category_key = req.query.category == null ? 'all' : req.query.category
  if (search_key == null) {
    res.end(parse_results([]))
  } else {
    PirateBay.search(search_key, {
      category: category_key
    })
    .then(results => res.end(parse_results(results)))
    .catch(err => console.log(err))
  }
}

function parse_results(results) {
  console.log(results)
  var html = pug.renderFile('template.pug', {'results': results});
  return html
}
