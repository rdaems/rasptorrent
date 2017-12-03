var Transmission = require('transmission')


var transmission = new Transmission({
    port: 9091,
    host: '127.0.0.1',
    username: 'transmission',
    password: 'transmission'
});

magnet_uri = 'magnet:?xt=urn:btih:8ff9272b48ec567e999490e7aabd3628a9be5cbe&dn=Game.of.Thrones.S06E02.PROPER.HDTV.x264-BATV%5Bettv%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'

transmission.addUrl(magnet_uri, function(err, result) {
    if (err) {
        return console.log(err);
    }
    var id = result.id;
    console.log('Just added a new torrent.');
    console.log('Torrent ID: ' + id);
    Transmission.getTorrent(id);
});
