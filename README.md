# Asterisk Manager Interface Socket

### Info
This is a module written in node.js that connects to an Asterisk Manager Interface(AMI), parses the messages Asterisk sends, and emits events per each AMI event.

### Usage

```
var ami_socket = require('./ami_socket.js');
ami_socket.connect(host,port,username,password);

//now you can listen for any AMI event like below
ami_socket.on('PeerStatus', function (data) {
  console.log('Peer [' + data['Peer'] + '] is ' + data['PeerStatus'] + ' from ' + data['Address']);
});
```
