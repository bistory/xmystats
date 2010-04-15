xmystats_regies[xmystats_regies.length] = { long: '128B', court: '128b' };

var XMY_NbStats_128b = 6;
var XMY_SiteWeb_128b = 'http://www.128b.com/';
var XMY_RecupStats_128b = 'OUI';


function XMY_param_128b(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.128b.com/v2/identification.php' },
		input: { 'LOGIN': login, 'PASSWORD': XMY_getPassword('128b', login), 'TYPE': 'W' },
	};
}


function XMY_getStats_128b(login, other) {
	var form = XMY_param('128b', login);
	XMY_req_extractStats('total', 'mois', '128b', login, other, form['form']['action'], '<label for="login">Solde : (' + XMY_montant + ')   &euro;</label>', false, form['form']['method'], form['params']);
}
function XMY_getStats_128b_mois(login, other) {
	XMY_req_extractStats('mois', 'moisAtt', '128b', login, other, 'http://www.128b.com/v2/admin/statistiques_webmaster.php', '<td>(' + XMY_montant + ')</td>', false, 'POST', XMY_makeParams_128b('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), null, '<td>Total</td>');
}
function XMY_getStats_128b_moisAtt(login, other) {
	XMY_req_extractStats('mois', 'm_1', '128b', login, other, 'http://www.128b.com/v2/admin/statistiques_webmaster.php', '<td align="center">(' + XMY_montant + ')</td>', true, 'POST', XMY_makeParams_128b('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), null, "<td colspan='3'>Total</td>");
}
function XMY_getStats_128b_m_1(login, other) {
	XMY_req_extractStats('m-1', 'jour', '128b', login, other, 'http://www.128b.com/v2/admin/statistiques_webmaster.php', '<td>(' + XMY_montant + ')</td>', false, 'POST', XMY_makeParams_128b('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), null, '<td>Total</td>');
}
function XMY_getStats_128b_jour(login, other) {
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'j_1', '128b', login, other, 'http://www.128b.com/v2/admin/statistiques_webmaster.php', '<td>(' + XMY_montant + ')</td>', false, 'POST', XMY_makeParams_128b(date, date), null, '<td>Total</td>');
}
function XMY_getStats_128b_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr');
	XMY_req_extractStats('j-1', null, '128b', login, other, 'http://www.128b.com/v2/admin/statistiques_webmaster.php', '<td>(' + XMY_montant + ')</td>', false, 'POST', XMY_makeParams_128b(date, date), null, '<td>Total</td>');
}


function XMY_makeParams_128b(d1, d2) {
	return 'idcat=&periode=&idsite=&idcampagne=&Submit=G%E9n%E9rer+les+statistiques&action=showstat&datedebut=' + d1 + '&datefin=' + d2;
}