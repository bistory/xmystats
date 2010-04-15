xmystats_regies[xmystats_regies.length] = { long: 'Comtrack', court: 'comtrack' };

var XMY_NbStats_comtrack = 5;
var XMY_RecupStats_comtrack = 'OUI';
var XMY_SuppFields_comtrack = { id_regie: 'ID Régie' };


function XMY_param_comtrack(login) {
	var temp = login.split(xmystats_separator2);
	
	return {
		form: { 'method': 'get', 'action': 'http://ct2.comclick.com/ihm3/editeur/connexion.php' },
		input: { 'id_regie': temp[1], 'type': 'E', 'login': temp[0], 'pass': XMY_getPassword('comtrack', temp[0]) },
	};
}


function XMY_getStats_comtrack(login, other) {
	var form = XMY_param('comtrack', login);
	XMY_req_extractStats('total', 'mois', 'comtrack', login, other, form['form']['action'], '(' + XMY_montant + ') &euro;', false, form['form']['method'], form['params'], null, "<td class='stats_0'>");
}
function XMY_getStats_comtrack_mois(login, other) {
	var mois = XMY_getDate('mois', 'us');
	XMY_req_extractStats('mois', 'm_1', 'comtrack', login, other, 'http://ct2.comclick.com/ihm3/editeur/detail_mois_campagne.php?mois=' + mois, '<td class="index_stats_entete_1"> (' + XMY_montant + ') &euro;</td>', false, 'GET', null, null, '<td> </td>');
}
function XMY_getStats_comtrack_m_1(login, other) {
	var mois = XMY_getDate('m-1', 'us');
	XMY_req_extractStats('m-1', 'jour', 'comtrack', login, other, 'http://ct2.comclick.com/ihm3/editeur/detail_mois_campagne.php?mois=' + mois, '<td class="index_stats_entete_1"> (' + XMY_montant + ') &euro;</td>', false, 'GET', null, null, '<td> </td>');
}
function XMY_getStats_comtrack_jour(login, other) {
	var date = XMY_getDate('jour', 'us');
	XMY_req_extractStats('jour', 'j_1', 'comtrack', login, other, 'http://ct2.comclick.com/ihm3/editeur/detail_campagne_jour.php', "<TD CLASS='stats_1'>(" + XMY_montant + ") &euro;</TD>", false, 'GET', null, null, "<TD CLASS='stats_0'>" + date + "</TD>");
}
function XMY_getStats_comtrack_j_1(login, other) {
	var date = XMY_getDate('j-1', 'us');
	XMY_req_extractStats('j-1', null, 'comtrack', login, other, 'http://ct2.comclick.com/ihm3/editeur/detail_campagne_jour.php', "<TD CLASS='stats_1'>(" + XMY_montant + ") &euro;</TD>", true, 'GET', null, null, "<TD CLASS='stats_0'>" + date + "</TD>");
}