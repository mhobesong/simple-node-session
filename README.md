# simple-node-session
Simple session manager for nodejs.

## Brief
Starts and tracks user sessions. A session is kept acitive for 24 minutes after last request. Expired sessions are cleared every hour.


## Installation
Just import the module.

```javascript
const session = require('./simple-node-session.js');
```

## Usage

#### 1. Start Session

```javascript
const server = http.createServer((req, res) => {
	session.start(req,res);
});
```
#### 2. Set and Get Session data

```javascript
const server = http.createServer((req, res) => {
	session.start(req,res);
  
  session.set('user',{id:12,name:'Jonh'});
  session.get('user'); //returns {id:12,name:'John'}

  Session.get('person') // returns null
});
```
#### 3. Deleting data
```javascript
const server = http.createServer((req, res) => {
  session.start(req,res);
  
  session.set('user',{id:12,name:'Jonh'});  
  session.set('user2', {id:11,name:'Smith'});
  
  Session.remove('user');
  session.get('user'); //returns null
  session.get('user2'); //returns {id:11,name:'Smith'}
});
```

#### 4. Clear session
```javascript
const server = http.createServer((req, res) => {
  session.start(req,res);
  
  session.set('user',{id:12,name:'Jonh'});  
  session.set('user2', {id:11,name:'Smith'});
  
  Session.clear();
  
  session.get('user'); //returns null
  session.get('user2'); //returns null
});
```

#### 5. Get session Id
```javascript
const server = http.createServer((req, res) => {
  session.start(req,res);
  
  session.getId(); //example output: 15462993004401260632411303441255082165051805156267545744228041233671277163233824562443261074464378433044351882158
});
```
## Drawbacks
Stores session data in a json object. This Object can get large in memory with thousands of active sessions.
