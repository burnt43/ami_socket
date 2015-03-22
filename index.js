var net = require('net');
var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();
module.exports.connect = function (host,port,username,password) {
  var client = net.Socket();

  client.setEncoding('utf8');

  client.connect(port,host,function () {
    function login (username,password) {
      client.write('Action: Login\n' +
        'Username: ' + username + '\n' +
        'Secret: ' + password + '\n\n'
      );
    }
    login(username,password);
  });

  client.on('data', function (data) {
    ami_event_found = false;
    ami_event_hash = {};

    function emit_event(hash) {
      module.exports.emit(hash['Event'],hash);
    }

    function parse_line (line) {
      space = line.indexOf(' ');
      name = line.substring(0,space - 1);
      info = line.substring(space + 1);

      if ( name == 'Event' ) {
        ami_event_found = true;
        ami_event_hash[name] = info;
      } else if ( name == '' ) {
        if ( ami_event_found ) {
          emit_event(ami_event_hash);
          ami_event_found = false;
        }
      } else {
        if ( ami_event_found ) { ami_event_hash[name] = info; }
      }
    }

    function parse_response (response) {
      response_by_line = response.split('\n');
      response_by_line.forEach( function (line) {
        parse_line(line.trim());
      });
    }

    parse_response(data);
  });

  client.on('close', function () {
  });
}
