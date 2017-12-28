main(WScript.Arguments);

/**
 * Main function
 * @param {Object} args Command line arguments
 */
function main(args) {
  if (args.length < 2) {
    log('usage: CScript fget.js [url] [filename]');
    WScript.Quit(1);
  }

  var url = args(0),
    filename = args(1);

  var completed = false;

  downloadFile(url, filename, function(err) {
    if (err) {
      log(err.message);
    } else {
      log('Done');
    }
    completed = true;
  });

  while (!completed) {
    WScript.Sleep(1000);
  }
}

/**
 * Log output to console.
 * @param {String} message
 */
function log(message) {
  WScript.Echo(message);
}

/**
 * Download file from specified URL
 *
 * @param {String} url Url to download
 * @param {String} filename Filename to save
 * @param {Function} callback Callback function when download is completed or failed
 */
function downloadFile(url, filename, callback) {

  var xmlhttp = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
  var ostream = new ActiveXObject("Adodb.Stream");

  try {
    xmlhttp.open("GET", url, false); //do synchrounous
    xmlhttp.setProxy(2, "gatehousek1.stgeorge.com.au:8080", "<local>");

    xmlhttp.send();

    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        ostream.type = 1 /*adTypeBinary*/ ;
        ostream.open();
        ostream.write(xmlhttp.responseBody);
        ostream.savetofile(filename, 2 /* adSaveCreateOverWrite */ );
        callback();
      } else {
        callback(new Error(xmlhttp.status + ' ' + xmlhttp.statusText));
      }
      xmlhttp = null;
      ostream = null;
    }

  } catch (e) {
    WScript.Echo("Exception caught. There should be an exception if the credentials are wrong.");
    WScript.Echo(e.number + " " + e.description);
    if (xmlhttp.status != 407) {
      WScript.Echo("It should have returned 407 (not authorized), but returned = " + xmlhttp.status);
    } else {
      WScript.Echo("With wrong credentials, status returned 407 as expected");
    }
    callback(new Error('URL may be invalid'));
    xmlhttp.abort();
  }
}