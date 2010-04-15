xmystats_regies[xmystats_regies.length] = { long: 'Allopass', court: 'allopass' };

var XMY_NbStats_allopass = 5;
var XMY_Wmc_allopass = 28;
var XMY_SiteWeb_allopass = 'http://www.allopass.com/';
var XMY_RecupStats_allopass = 'OUI';


function XMY_param_allopass(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.allopass.com/merchant/auth/login?lc=fr_FR' },
		input: { 'email': login, 'password': XMY_getPassword('allopass', login), 'submit': '1' },
	};
}


function XMY_getStats_allopass(login, other) {
	XMY_req_extractStats(null, 'login', 'allopass', login, other, 'http://wap.allopass.com/');
}
var XMY_SID_allopass;
function XMY_getStats_allopass_login(login, other) {
	XMY_SID_allopass = XMY_req_extract('http://wap.allopass.com/', 'SID=([^"]+)"', true);
	XMY_req_extractStats(null, 'jour', 'allopass', login, other, 'http://wap.allopass.com/compte/login/SID=' + XMY_SID_allopass, null, false, 'POST', 'login=' + login + '&password=' + XMY_getPassword('allopass', login));
}
function XMY_getStats_allopass_jour(login, other) {
	XMY_req_extractStats('jour', 'j_1', 'allopass', login, other, 'http://wap.allopass.com/statistiques/view/SID=' + XMY_SID_allopass, "<b>Aujourd'hui</b> = ([0-9,.' ]+) EUR", false);
}
function XMY_getStats_allopass_j_1(login, other) {
	XMY_req_extractStats('j-1', 'mois', 'allopass', login, other, 'http://wap.allopass.com/statistiques/view/SID=' + XMY_SID_allopass, "Hier = ([0-9,.' ]+) EUR", true);
}
function XMY_getStats_allopass_mois(login, other) {
	var mois = XMY_getDate('mois', 'fr');
	XMY_req_extractStats('mois', 'total', 'allopass', login, other, 'http://wap.allopass.com/statistiques/view/SID=' + XMY_SID_allopass, " = ([0-9,.' ]+) EUR", true, null, null, null, 'Mois en cours');
}
function XMY_getStats_allopass_total(login, other) {
	XMY_req_extractStats('total', 'm_1', 'allopass', login, other, 'http://wap.allopass.com/statistiques/view/SID=' + XMY_SID_allopass, "Solde disponible = ([0-9,.' ]+) EUR", true);
}
function XMY_getStats_allopass_m_1(login, other) {
	var date = XMY_getDate('m-1', 'fr').split('/');
	var mois = date[0]; var annee = date[1];
	XMY_req_extractStats('m-1', null, 'allopass', login, other, 'http://wap.allopass.com/statistiques/details/SID=' + XMY_SID_allopass, " = ([0-9,.' ]+) EUR", false, 'POST', 'month=' + mois + '&year=' + annee, null, null, null, null, true);
}
