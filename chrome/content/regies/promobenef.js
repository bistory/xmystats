xmystats_regies[xmystats_regies.length] = { long: 'Promobenef', court: 'promobenef' };

var XMY_NbStats_promobenef = 5;
var XMY_Wmc_promobenef = 17;
var XMY_SiteWeb_promobenef = 'http://www.promobenef.com/';
var XMY_RecupStats_promobenef = 'OUI';


function XMY_param_promobenef(login) {
	return {
		form: { 'method': 'post', 'action': 'http://site.promobenef.com/v6/?c=login&a=login' },
		input: { 'email': login, 'login': 'true', 'pass': XMY_getPassword('promobenef', login) },
	};
}


function XMY_getStats_promobenef(login, other) {
	var form = XMY_param('promobenef', login);
	XMY_req_extractStats(null, 'total', 'promobenef', login, other, form['form']['action'], null, false, form['form']['method'], form['params']);
}
function XMY_getStats_promobenef_total(login, other) {
	XMY_req_extractStats('total', 'mois', 'promobenef', login, other, 'http://site.promobenef.com/membre/gains/', '<td align="right"><strong>(' + XMY_montant + ') &euro;</strong></td>', false, 'GET', null, null, '<td align="left"><div align="right"><strong>Solde</strong></div></td>');
}
function XMY_getStats_promobenef_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'promobenef', login, other, 'http://site.promobenef.com/membre/stats/index.php', '<td align="right"><strong>(' + XMY_montant + '[0-9]?) &euro;</strong></td>', false, 'GET', XMY_makeParams_promobenef(XMY_getDate('mois', 'us') + '-01', XMY_getDate('last-mois', 'us')), null, '<td align="right" colspan="3"><div align="center"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_promobenef_m_1(login, other) {
	XMY_req_extractStats('m-1', 'jour', 'promobenef', login, other, 'http://site.promobenef.com/membre/stats/index.php', '<td align="right"><strong>(' + XMY_montant + '[0-9]?) &euro;</strong></td>', false, 'GET', XMY_makeParams_promobenef(XMY_getDate('m-1', 'us') + '-01', XMY_getDate('last-m-1', 'us')), null, '<td align="right" colspan="3"><div align="center"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_promobenef_jour(login, other) {
	var date = XMY_getDate('jour', 'us');
	XMY_req_extractStats('jour', 'j_1', 'promobenef', login, other, 'http://site.promobenef.com/membre/stats/index.php', '<td align="right"><strong>(' + XMY_montant + '[0-9]?) &euro;</strong></td>', false, 'GET', XMY_makeParams_promobenef(date, date), null, '<td align="right" colspan="3"><div align="center"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_promobenef_j_1(login, other) {
	var date = XMY_getDate('j-1', 'us');
	XMY_req_extractStats('j-1', null, 'promobenef', login, other, 'http://site.promobenef.com/membre/stats/index.php', '<td align="right"><strong>(' + XMY_montant + '[0-9]?) &euro;</strong></td>', false, 'GET', XMY_makeParams_promobenef(date, date), null, '<td align="right" colspan="3"><div align="center"><strong>TOTAL</strong></div></td>');
}


function XMY_makeParams_promobenef(d1, d2) {
	return 'date_debut=' + d1 + '&date_fin=' + d2;
}