xmystats_regies[xmystats_regies.length] = { long: 'ClickInText', court: 'clickintext' };

var XMY_NbStats_clickintext = 5;
var XMY_Wmc_clickintext = 25;
var XMY_SiteWeb_clickintext = 'http://www.clickintext.com/';
var XMY_RecupStats_clickintext = 'OUI';


function XMY_param_clickintext(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.clickintext.com/about/login.php' },
		input: { 'login': login, 'pass': XMY_getPassword('clickintext', login), 'header': '1' },
	};
}


function XMY_getStats_clickintext(login, other) {
	XMY_req_extractStats('jour', 'j_1', 'clickintext', login, other, 'http://www.clickintext.com/editeurs/xmystats.php', '(' + XMY_montant + ')', false, 'POST', 'login=' + login + '&pass=' + XMY_getPassword('clickintext', login));
}
function XMY_getStats_clickintext_j_1(login, other) {
	XMY_req_extractStats('j-1', 'mois', 'clickintext', login, other, 'http://www.clickintext.com/editeurs/xmystats.php', XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'login=' + login + '&pass=' + XMY_getPassword('clickintext', login));
}
function XMY_getStats_clickintext_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'clickintext', login, other, 'http://www.clickintext.com/editeurs/xmystats.php', XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'login=' + login + '&pass=' + XMY_getPassword('clickintext', login));
}
function XMY_getStats_clickintext_m_1(login, other) {
	XMY_req_extractStats('m-1', 'total', 'clickintext', login, other, 'http://www.clickintext.com/editeurs/xmystats.php', XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'login=' + login + '&pass=' + XMY_getPassword('clickintext', login));
}
function XMY_getStats_clickintext_total(login, other) {
	XMY_req_extractStats('total', null, 'clickintext', login, other, 'http://www.clickintext.com/editeurs/xmystats.php', XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';' + XMY_montant + ';(' + XMY_montant + ')', true, 'POST', 'login=' + login + '&pass=' + XMY_getPassword('clickintext', login));
}