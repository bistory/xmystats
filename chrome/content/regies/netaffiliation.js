xmystats_regies[xmystats_regies.length] = { long: 'NetAffiliation', court: 'netaffiliation' };

var XMY_NbStats_netaffiliation = 9;
var XMY_Wmc_netaffiliation = 36;
var XMY_SiteWeb_netaffiliation = 'http://www.netaffiliation.com/';
var XMY_RecupStats_netaffiliation = 'OUI';


function XMY_param_netaffiliation(login) {
	var charge = XMY_req_extract('http://www.netaffiliation.com/', '<form method="post" action="/charge.php([^"]+)" style="margin:0;padding:0;">', false);

	return {
		form: { 'method': 'post', 'action': 'http://www.netaffiliation.com/charge.php' + charge },
		input: { 'identif': login, 'mdp': XMY_getPassword('netaffiliation', login) },
	};
}


var XMY_form_netaffiliation;
function XMY_getStats_netaffiliation(login, other) {
	XMY_form_netaffiliation = XMY_param('netaffiliation', login);
	XMY_req_extractStats(null, 'total', 'netaffiliation', login, other, XMY_form_netaffiliation['form']['action'], null, false, XMY_form_netaffiliation['form']['method'], XMY_form_netaffiliation['params']);
}
var XMY_server_netaffiliation;
function XMY_getStats_netaffiliation_total(login, other) {
	XMY_server_netaffiliation = XMY_req_extract(XMY_form_netaffiliation['form']['action'], 'http://([a-z0-5]+)\\.netaffiliation\\.com/', true, XMY_form_netaffiliation['form']['method'], XMY_form_netaffiliation['params']);
	XMY_req_extractStats('total', 'mois', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/paiement.php', 'Solde disponible en &#128; : <span class="titre">(' + XMY_montant + ')</span>');
}
function XMY_getStats_netaffiliation_mois(login, other) {
	XMY_req_extractStats('mois', 'moisAtt', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" class="TableauBarre" align="right"><b>(' + XMY_montant + ') &#128;<br></b></td>', false, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" class="TableauBarre" align="right"><b>');
}
function XMY_getStats_netaffiliation_moisAtt(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" class="TableauBarre" align="right"><b>(' + XMY_montant + ') &#128;<br></b></td>', true, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0');
}
function XMY_getStats_netaffiliation_m_1(login, other) {
	XMY_req_extractStats('m-1', 'm_1Att', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" class="TableauBarre" align="right"><b>(' + XMY_montant + ') &#128;<br></b></td>', false, 'GET', 'per=4&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" class="TableauBarre" align="right"><b>');
}
function XMY_getStats_netaffiliation_m_1Att(login, other) {
	XMY_req_extractStats('m-1', 'jour', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" class="TableauBarre" align="right"><b>(' + XMY_montant + ') &#128;<br></b></td>', true, 'GET', 'per=4&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0');
}
function XMY_getStats_netaffiliation_jour(login, other) {
	var date = XMY_getDate('jour', 'fr.');
	XMY_req_extractStats('jour', 'jourAtt', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '&#128;[^0-9]+<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
}
function XMY_getStats_netaffiliation_jourAtt(login, other) {
	var date = XMY_getDate('jour', 'fr.');
	XMY_req_extractStats('jour', 'j_1', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
}
function XMY_getStats_netaffiliation_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr.');
	var moisComp = date.substr(3);
	var mois = XMY_getDate('mois', 'fr.');
	if(mois == moisComp) {
		XMY_req_extractStats('j-1', 'j_1Att', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '&#128;[^0-9]+<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
	} else {
		XMY_req_extractStats('j-1', 'j_1Att', 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '&#128;[^0-9]+<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=4&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
	}
}
function XMY_getStats_netaffiliation_j_1Att(login, other) {
	var date = XMY_getDate('j-1', 'fr.');
	var moisComp = date.substr(3);
	var mois = XMY_getDate('mois', 'fr.');
	if(mois == moisComp) {
		XMY_req_extractStats('j-1', null, 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=3&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
	} else {
		XMY_req_extractStats('j-1', null, 'netaffiliation', login, other, 'http://' + XMY_server_netaffiliation + '.netaffiliation.com/aff/stats.php', '<td valign="middle" align="right" class="TableauBarre">(' + XMY_montant + ') &#128;</td>', true, 'GET', 'per=4&sites%5B%5D=0&progs%5B%5D=0&dim=3&rappel=-1&rdeb=0', null, '<td valign="middle" align="left" class="TableauBarre">' + date + '</td>');
	}
}