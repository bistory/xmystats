// Gestion des préférences
var xmystats_prefManager 	= Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

var xmystats_isOldManager = ("@mozilla.org/passwordmanager;1" in Components.classes);
if (xmystats_isOldManager) {
	// avant Firefox 3 : gestionnaire de mots de passe
	var xmystats_passManager 	= Components.classes["@mozilla.org/passwordmanager;1"].createInstance(Components.interfaces.nsIPasswordManager);
	var xmystats_passManagerI	= Components.classes["@mozilla.org/passwordmanager;1"].createInstance(Components.interfaces.nsIPasswordManagerInternal);
} else {
	// après Firefox 3 : gestionnaire d'identification
	var xmystats_loginManager	= Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
	var xmystats_loginManagerI	= new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");
}

var xmystats_prefUrl = 'chrome://xmystats/';
var xmystats_prefAut = null;
var xmystats_prefRea = xmystats_prefUrl;

/*** STRING ***/
function XMY_prefSetString(nom, valeur) {
	xmystats_prefManager.setCharPref("extensions.xmystats." + nom, valeur);
}
function XMY_prefGetString(nom) {
	return (xmystats_prefManager.prefHasUserValue("extensions.xmystats." + nom)) ? xmystats_prefManager.getCharPref("extensions.xmystats." + nom) : null;
}

/*** INTEGER ***/
function XMY_prefSetInt(nom, valeur) {
	xmystats_prefManager.setIntPref("extensions.xmystats." + nom, valeur);
}
function XMY_prefGetInt(nom) {
	return (xmystats_prefManager.prefHasUserValue("extensions.xmystats." + nom)) ? xmystats_prefManager.getIntPref("extensions.xmystats." + nom) : null;
}

/*** PASSWORD ***/
function XMY_transformForPassword(regie, login) {
	return login + ' (' + regie + ')';
}

function XMY_setPassword(regie, login, pass) {
	XMY_delPassword(regie, login);
	if(xmystats_isOldManager) XMY_setPassword_old(regie, login, pass);
	else XMY_setPassword_new(regie, login, pass);
}
function XMY_setPassword_old(regie, login, pass) {
	// avant Firefox 3
	try {
		xmystats_passManagerI.addUserFull(xmystats_prefUrl, XMY_transformForPassword(regie, login), pass, "", "");
	} catch(err) {
		alert("L'enregistrement du mot de passe a renvoy\xE9 l'erreur : " + err);
	}
}
function XMY_setPassword_new(regie, login, pass) {
	// après Firefox 3
	try {
		var loginInfo = new xmystats_loginManagerI(xmystats_prefUrl, xmystats_prefAut, xmystats_prefRea, XMY_transformForPassword(regie, login), pass, "", "");
		xmystats_loginManager.addLogin(loginInfo);
	} catch(err) {
		alert("L'enregistrement du mot de passe a renvoy\xE9 l'erreur : " + err);
	}
}

function XMY_getPassword(regie, login) {
	return (xmystats_isOldManager ? XMY_getPassword_old(regie, login) : XMY_getPassword_new(regie, login));
}
function XMY_getPassword_old(regie, login) {
	// avant Firefox 3
	var password = { value : "" };
	try {
		xmystats_passManagerI.findPasswordEntry(xmystats_prefUrl, XMY_transformForPassword(regie, login), null, { value : "" }, { value : "" }, password);
		return password.value;
	} catch(err) {}
	return null;
}
function XMY_getPassword_new(regie, login) {
	// après Firefox 3
	try {
		var logins = xmystats_loginManager.findLogins({}, xmystats_prefUrl, xmystats_prefAut, xmystats_prefRea);
		for (var i = 0; i < logins.length; i++) {
			if (logins[i].username == XMY_transformForPassword(regie, login)) {
				return logins[i].password;
			}
		}
	} catch(err) {}
	return null;
}

function XMY_delPassword(regie, login) {
	if(xmystats_isOldManager) XMY_delPassword_old(regie, login);
	else XMY_delPassword_new(regie, login);
}
function XMY_delPassword_old(regie, login) {
	// avant Firefox 3
	try {
		if(XMY_getPassword(regie, login) != null) {
			xmystats_passManager.removeUser(xmystats_prefUrl, XMY_transformForPassword(regie, login));
		}
	} catch(err) {
		alert("La suppresion du mot de passe a renvoy\xE9 l'erreur : " + err);
	}
}
function XMY_delPassword_new(regie, login) {
	// après Firefox 3
	try {
		var logins = xmystats_loginManager.findLogins({}, xmystats_prefUrl, xmystats_prefAut, xmystats_prefRea);
		for (var i = 0; i < logins.length; i++) {
			if (logins[i].username == XMY_transformForPassword(regie, login)) {
				xmystats_loginManager.removeLogin(logins[i]);
				break;
			}
		}
	} catch(err) {
		alert("La suppresion du mot de passe a renvoy\xE9 l'erreur : " + err);
	}
}

/*** CACHE ***/
function XMY_getTimeFromCache(id) {
	return XMY_prefGetString('stats.' + escape(id) + '.time');
}

function XMY_getFromCache(id, minutes) {
	var v = null;
	
	if(minutes == null) minutes = XMY_prefGetInt('pref-maxCacheTime');
	if(minutes == null) minutes = 30;
	
	v = XMY_prefGetString('stats.' + escape(id) + '.value');
	if (v != null) {
		var d = new Date();
		if (d.getTime() - (minutes*60*1000) > XMY_getTimeFromCache(id)) {
			return null;
		}
		return JSON.parse(unescape(v));
	}
	return null;
}

function XMY_setToCache(id, v) {
	var d = new Date();
	XMY_prefSetString('stats.' + escape(id) + '.time', d.getTime());
	XMY_prefSetString('stats.' + escape(id) + '.value', escape(JSON.stringify(v)));
}