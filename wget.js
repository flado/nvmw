var url = require('url'),
    bytes = require('./bytes'),
    fs = require('fs'),
    proxy = require('./bt-proxy'),
    ESC_UP_CLL = '\x1B[1A\x1B[K'; // Up + Clear-Line

function wget(uri, callback) {
    console.log('Download file from %s', uri);

    var optionsParsed = url.parse(uri);
    var paths = optionsParsed.pathname.split('/');
    var filename = paths[paths.length - 1];
    //console.log(filename);

    //var http = require(uri.indexOf('https') === 0 ? 'https' : 'http');
    var http = require('http');

    var options = {
        path: uri
    }
    //set proxy if any
    if (proxy.host) {
        options.host = proxy.host;
        options.port = proxy.port;
    }

    console.log('> HTTP GET using options: ', JSON.stringify(options, null, '\t'));

    var req = http.get(options, function (res) {
        if (res.statusCode === 302 || res.statusCode === 301) {
            console.log('Redirect: ' + res.headers.location);
            return wget(res.headers.location, callback);
        }
        if (res.statusCode !== 200) {
            callback(null);
            return;
        }

        console.log('> HTTP Response Headers: ', JSON.stringify(res.headers, null, '\t'));

        var contentLength = parseInt(res.headers['content-length'], 10);
        if (isNaN(contentLength)) {
            console.log('ERROR: Can\'t get \'content-length\' *************** Please try again ***************');
            callback(null);
            return;
        }
        console.log('Content length is %s', bytes(contentLength));

        var data = new Buffer(contentLength);
        var offset = 0;

        var start = Date.now();
        console.log(''); // New line for ESC_UP_CLL
        res.on('data', function (buf) {
            buf.copy(data, offset);
            offset += buf.length;
            var use = Date.now() - start;
            if (use === 0) {
              use = 1;
            }
            console.log(ESC_UP_CLL + 'Download %d%, %s / %s, %s/s ...',
                parseInt(offset / contentLength * 100, 10), bytes(offset), bytes(contentLength),
                bytes(offset / use * 1000));
        });

        res.on('end', function () {
            console.log('Donwload done');
            callback(filename, data);
        });
    });

    req.on('error', function (e) {
        console.log('Got error: ' + e.message);
    });
}

module.exports = wget;
