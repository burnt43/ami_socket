# Asterisk Manager Interface Socket

### Info
This is a module written in node.js that connects to an Asterisk Manager Interface(AMI), parses the messages Asterisk sends, and emits events per each AMI event.

### Usage
- **add ami_socket to your package.json**
``` json
  {
    "name": "foobar",
    ...
    "dependencies": {
      ...
      "ami_socket": ">0.0.1"
    }
  }
```
- **npm install**
- **require the module**
``` javascript
var ami_socket = require('ami_socket');
```
- **connect to an AMI server**
``` javascript
ami_socket.connect(host,port,username,password);
```
- **listen for events**
``` javascript
ami_socket.on(AMI_EVENT, function (DATA) {} );
```
**AMI_EVENT is the name of an AMI Event. e.g.**
* PeerStatus
* QueueMemberStatus
* Hangup
* Cdr
* Newexten

**DATA is a hash of the message. e.g. for a QueueMemberStatus message**
``` javascript
{
  Event: 'QueueMemberStatus',
  Privilege: 'agent,all',
  Queue: 'AutoParts',
  Location: 'SIP/100',
  MemberName: 'SIP/100',
  Membership: 'dynamic',
  Penalty: '0',
  CallsTaken: '8',
  LastCall: '1426883213',
  Status: '1',
  Paused: '0'
}
```

### Example

**foobar.js**
``` javascript
//simple program to open up a connect to AMI and listen for PeerStatus events
var ami_socket = require('ami_socket');
ami_socket.connect("localhost",5038,"client","foobar");

//now you can listen for any AMI event like below
ami_socket.on('PeerStatus', function (data) {
  console.log('Peer [' +
    data['Peer'] +
    '] is ' +
    data['PeerStatus'] +
    ' from ' +
    data['Address']
  );
});
```
**Running foobar.js in a terminal**
<pre>
$ node foobar.js
Peer [SIP/261] is Registered from 84.89.45.14:20826
Peer [SIP/107] is Registered from 100.19.61.99:5060
Peer [SIP/129] is Registered from 23.190.17.235:5060
...
</pre>
