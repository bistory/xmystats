xmystats_regies[xmystats_regies.length] = { long: 'Effiliation', court: 'effiliation' };

var XMY_NbStats_effiliation = 4;
var XMY_Wmc_effiliation = 65;
var XMY_SiteWeb_effiliation = 'http://www.effiliation.com/';
var XMY_RecupStats_effiliation = 'PARTIEL';


function XMY_param_effiliation(login) {
	var redirectURL = XMY_req_extract('http://www.affilies.biz/affilie/j_security_check', 'redirectURL=(.+)&', false, 'POST', 'lg=fr&j_username=' + login + '&j_password=' + XMY_getPassword('effiliation', login) + '&ajax=true');
	
	return {
		form: { 'method': 'get', 'action': 'http://www.affilies.biz/affilie/secure/index.effi' },
		input: { 'intranet': 'null', 'from': 'null', 'redirectURL': redirectURL, 'lg': 'fr' },
	};
}


function XMY_getStats_effiliation(login, other) {
	var form = XMY_param('effiliation', login);
	XMY_req_extractStats(null, 'mois', 'effiliation', login, other, form['form']['action'], null, false, form['form']['method'], form['params']);
}
function XMY_getStats_effiliation_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'effiliation', login, other, 'http://www.affilies.biz/affilie/secure/home/index.effi', '(' + XMY_montant + ')', false, 'GET', null, null, '<span class="font_03">Ce mois (en cours)</span>');
}
function XMY_getStats_effiliation_m_1(login, other) {
	XMY_req_extractStats('m-1', 'jour', 'effiliation', login, other, 'http://www.affilies.biz/affilie/secure/home/index.effi', '(' + XMY_montant + ')', true, 'GET', null, null, '<span class="font_03">Le mois dernier</span>');
}
function XMY_getStats_effiliation_jour(login, other) {
	XMY_req_extractStats('jour', 'j_1', 'effiliation', login, other, 'http://www.affilies.biz/affilie/secure/home/index.effi', '(' + XMY_montant + ')', true, 'GET', null, null, '<span class="font_03">Aujourd\'hui</span>');
}
function XMY_getStats_effiliation_j_1(login, other) {
	XMY_req_extractStats('j-1', null, 'effiliation', login, other, 'http://www.affilies.biz/affilie/secure/home/index.effi', '(' + XMY_montant + ')', true, 'GET', null, null, '<span class="font_03">Hier</span>');
}