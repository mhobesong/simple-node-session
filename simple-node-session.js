 /**
 * simple-node-session.js
 * https://github.com/mhobesong/simple-node-session
 *
 * email: mosbesong@gmail.com
 *
 * Copyright 2018
 * Released under the MIT license
 */
module.exports = (function (){
	var sessions = {};
	var request;
	var response;

	setInterval(function(){ // clean expired sessions
		Object.keys(sessions).forEach(function(key, idx) {
			if (getTime() > sessions[key].expire){
				del(key);
				sessionId = createSession();
			}
		});
	}, 3600000);//every hour

	function start(req, res){
		request = req;
		response = res;
		var sessionId = getCookie('NODESESSION');

		if (!sessionId){
			sessionId = createSession();
		}

		if (!sessions[sessionId]){
			createSession(sessionId);
		}

		if (getTime() > sessions[sessionId].expire){
			del(sessionId);
			sessionId = createSession();
		}else{
			sessions[sessionId].expire = getTime() + 1440;
		}

		response.setHeader('Set-Cookie','NODESESSION='+sessionId);
	}

	function get(key){
		var id = getCookie('NODESESSION') 

		if (!id) return null;

		if(sessions[id].expire < getTime()){
			del(id);
			return null;
		}

		return sessions[id]['data'][key];
	}

	function remove(key){
		var id = getCookie('NODESESSION') 

		if (!id) return null;

		if(sessions[id].expire < getTime()){
			del(id);
		}

		delete sessions[id]['data'][key];
	}

	function clear(){
		var id = getCookie('NODESESSION') 

		if (!id) return null;

		if(sessions[id].expire < getTime()){
			del(id);
		}

		sessions[id]['data'] = {};
	}

	function set(key, data){
		var id = getCookie('NODESESSION') 

		if (!id) return null;

		if(sessions[id].expire < getTime()){
			del(id);
			return null;
		}

		sessions[id]['data'][key] = data;
		return sessions[id]['data'];
	}

	function del(id){
		delete sessions[id];
	}

	function createSession(id){
		var id = (id)?id:generateSessionId();
		var expire = getTime() + 1440;

		var data = {
			id: id,
			expire: expire,
			data:{}
		}

		sessions[id] = data;
		console.log(sessions);
		return id;
	}

	function generateSessionId()
	{
		let randomString = '';
		for (let i=0; i < 100; i++){
			randomString+=String.fromCharCode(48+ Math.floor(Math.random()*9));
		}
			
		return getTime()+''+randomString;
	}

	function getCookie(key){
		var cookies = parseCookies();
		var cookie =  cookies[key];
		if (typeof cookie == 'undefined') return null;

		return cookie;
	}

	function parseCookies () {
		var list = {},
		rc = request.headers.cookie;

		rc && rc.split(';').forEach(function( cookie ) {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});

		return list;
	}

	function getId(){
		return getCookie('NODESESSION');
	}

	function getTime(){
		return (new Date).getTime()/1000; //convert to miliseconds
	}

	return {
		start:start,
		set:set,
		get:get,
		getId: getId,
		remove: remove,
		clear:clear
	}
})();
