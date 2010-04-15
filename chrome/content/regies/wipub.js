xmystats_regies[xmystats_regies.length] = { long: 'WiPub', court: 'wipub' };

var XMY_NbStats_wipub = 5;
var XMY_Wmc_wipub = 12;
var XMY_SiteWeb_wipub = 'http://www.wipub.com/';
var XMY_RecupStats_wipub = 'OUI';


function XMY_param_wipub(login) {
	return {
		form: { 'action': 'http://www.wipub.com/v2/login.php', 'method': 'post' },
		input: { 'log': login, 'pa': XMY_getPassword('wipub', login) },
	};
}


function XMY_getStats_wipub(login, other) {
	var form = XMY_param('wipub', login);
	XMY_req_extractStats('total', 'jour', 'wipub', login, other, form['form']['action'], '<td  background="img/cadresolde.gif" height="23" id="centre11" colspan="2"><div align="center"><strong>Solde : </strong> (' + XMY_montant + ') .</div></td>', false, form['form']['method'], form['params']);
}
function XMY_getStats_wipub_jour(login, other) {
	var form = XMY_param('wipub', login);
	XMY_req_extractStats('jour', 'mois', 'wipub', login, other, form['form']['action'], '<td id="centre11"><div align="center">(' + XMY_montant + ')</div></td>', true, form['form']['method'], form['params']);
}
function XMY_getStats_wipub_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'wipub', login, other, 'http://www.wipub.com/v2/detailstatistiques.php?type=affilie&mode=mois', "<td width='60' align='center'><b>(" + XMY_montant + ") [^%]</b></td>", false, null, null, null, "<td align='right'>Total</td>");
}
function XMY_getStats_wipub_m_1(login, other) {
	XMY_req_extractStats('m-1', 'j_1', 'wipub', login, other, 'http://www.wipub.com/v2/detailstatistiques.php?type=affilie&mode=moisprecedent', "<td width='60' align='center'><b>(" + XMY_montant + ") [^%]</b></td>", false, null, null, null, "<td align='right'>Total</td>");
}
function XMY_getStats_wipub_j_1(login, other) {
	XMY_req_extractStats('j-1', null, 'wipub', login, other, 'http://www.wipub.com/v2/detailstatistiques.php?type=affilie&mode=veille', "<td width='60' align='center'><b>(" + XMY_montant + ") [^%]</b></td>", false, null, null, null, "<td align='right'>Total</td>");
}