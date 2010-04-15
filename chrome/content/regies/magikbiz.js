xmystats_regies[xmystats_regies.length] = { long: 'MagikBiz', court: 'magikbiz' };

var XMY_NbStats_magikbiz = 5;
var XMY_SiteWeb_magikbiz = 'http://www.magikbiz.com/';
var XMY_RecupStats_magikbiz = 'OUI';


function XMY_param_magikbiz(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.magikbiz.com/' },
		input: { 'login': login, 'password': XMY_getPassword('magikbiz', login), '__EVENTTARGET': '_ctl0', '__VIEWSTATE': 'dDwxODgyNzY0NDIyOzs+' },
	};
}


function XMY_getStats_magikbiz(login, other) {
	XMY_req_extractStats('jour', 'j_1', 'magikbiz', login, other, 'http://magikbiz.com/xmystats.aspx', '(' + XMY_montant + ')', false, 'POST', 'l=' + login + '&p=' + XMY_getPassword('magikbiz', login));
}
function XMY_getStats_magikbiz_j_1(login, other) {
	XMY_req_extractStats('j-1', 'mois', 'magikbiz', login, other, 'http://magikbiz.com/xmystats.aspx', XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'l=' + login + '&p=' + XMY_getPassword('magikbiz', login));
}
function XMY_getStats_magikbiz_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'magikbiz', login, other, 'http://magikbiz.com/xmystats.aspx', XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'l=' + login + '&p=' + XMY_getPassword('magikbiz', login));
}
function XMY_getStats_magikbiz_m_1(login, other) {
	XMY_req_extractStats('m-1', 'total', 'magikbiz', login, other, 'http://magikbiz.com/xmystats.aspx', XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'l=' + login + '&p=' + XMY_getPassword('magikbiz', login));
}
function XMY_getStats_magikbiz_total(login, other) {
	XMY_req_extractStats('total', null, 'magikbiz', login, other, 'http://magikbiz.com/xmystats.aspx', XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'l=' + login + '&p=' + XMY_getPassword('magikbiz', login));
}