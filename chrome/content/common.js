// Partenaire
var xmystats_partenaire_id = 1;

// Chargement des régies
var xmystats_regies = new Array();

// Inclusion des librairies
var loader =  Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
loader.loadSubScript("chrome://xmystats/content/regies.js");
loader.loadSubScript("chrome://xmystats/content/lib/browser.js");
loader.loadSubScript("chrome://xmystats/content/lib/currencies.js");
loader.loadSubScript("chrome://xmystats/content/lib/transform.js");
loader.loadSubScript("chrome://xmystats/content/lib/json.js");
loader.loadSubScript("chrome://xmystats/content/lib/md5.js");
loader.loadSubScript("chrome://xmystats/content/lib/base64.js");

// Séparateurs
var xmystats_separator1		= '[XMY1]';
var xmystats_separator2		= '[XMY2]';
var xmystats_idweb				= false;

// Charger tous les comptes d'une régie
function XMY_loadCompte(regie, stopIfError, alertIfError) {
	if(!stopIfError) stopIfError = false;
	if(!alertIfError) alertIfError = false;
	
	var liste = XMY_prefGetString('comptes.' + regie + '.liste');
	var ret = new Array();
	
	if (liste) {
		var comptes = liste.split(xmystats_separator1);
		for (var a in comptes) {
			if (comptes[a]) {
				var compte = comptes[a].split(xmystats_separator2);
				var temp = XMY_getPassword(regie, compte[1]);
				if(temp == null && stopIfError) {
					if(alertIfError) alert("Le mot de passe du compte '" + compte[0] + "' pour la r\xE9gie '" + regie + "' n'est pas d\xE9fini.\nVeuillez red\xE9finir le compte !");
				} else {
					compte[compte.length] = temp;
					ret.push(compte);
				}
			}
		}
	}
	
	return ret;
}

// Exécuter une requête XML
function XMY_req_xml(method, url, data, fct) {
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			fct(xmlhttp.responseXML.childNodes[0]);
		}
	}
	
	if(method == 'GET' && data != null) {
		url += '?' + data;
		data = null;
	}
	
	xmlhttp.open(method, url, true);
	if (method == 'POST') {
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-Length", data.length);
	}
	xmlhttp.send(data);
	
	return false;
}


var XMY_req_extract_memo = new Object();

// Récupérer une valeur particulière sur une page - mode synchrone
function XMY_req_extract(url, regexp, dontreload, mode, data, referer, codeBefore, codeAfter) {
	if(!dontreload) dontreload = false;
	if(!mode) mode = 'GET';
	mode = mode.toUpperCase();
	if(!data) data = null;
	if(!referer) referer = null;
	if(!codeBefore) codeBefore = null;
	if(!codeAfter) codeAfter = null;

	var separator = '[#XMYSEP#]';
	var key = mode + separator + url + separator + data;
	
	if(mode == 'GET') {
		url = url + (data ? '?' + data : '');
		data = null;
	}
	
	if (!dontreload || !XMY_req_extract_memo[key]) {
	
		var timer = XMY_prefGetInt('pref-maxTimeOut');
		if(timer == null) {
			timer = 15;
		}
	
		var timeOut = window.setTimeout(function() { myHttpRequest.abort(); }, timer * 1000);
	
		var myHttpRequest = new XMLHttpRequest();

		myHttpRequest.open(mode, url, false);

		if(mode == 'POST') {
			myHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			myHttpRequest.setRequestHeader('Content-Length', data.length);
		}
		if (referer != null) {
			myHttpRequest.setRequestHeader('Referer', referer);
		}

		myHttpRequest.send(data);
	
		clearTimeout(timeOut);

		if(myHttpRequest.readyState != 4) {
			return null;
		}
		
		XMY_req_extract_memo[key] = myHttpRequest.responseText;
	}
	
	return XMY_applyRegExp(XMY_req_extract_memo[key], regexp, codeBefore, codeAfter);
}