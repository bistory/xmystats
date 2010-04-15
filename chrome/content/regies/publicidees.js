xmystats_regies[xmystats_regies.length] = { long: 'Public-Idées', court: 'publicidees' };

var XMY_NbStats_publicidees = 9;
var XMY_Wmc_publicidees = 37;
var XMY_SiteWeb_publicidees = 'http://www.publicidees.com/';
var XMY_RecupStats_publicidees = 'OUI';


function XMY_param_publicidees(login) {
	var h = XMY_req_extract('http://www.publicidees.com/', '<input name="h" type="hidden" value="([^"]+)">', false);
	
	return {
		form: { 'method': 'post', 'action': 'http://affilie.publicidees.com/entree_affilies.php' },
		input: { 'login': login, 'pass': XMY_getPassword('publicidees', login), 'h': h },
	};
}


function XMY_getStats_publicidees(login, other) {
	var form = XMY_param('publicidees', login);
	XMY_req_extractStats('total', 'jour', 'publicidees', login, other, form['form']['action'], '<strong>CA :</strong> (' + XMY_montant + ') &euro;', false, form['form']['method'], form['params']);
}
function XMY_getStats_publicidees_jour(login, other) {	
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'jourAtt', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot"><div class="tabR">(' + XMY_montant + ') .</div></td>', false, 'POST', XMY_makeParams_publicidees(date, date), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_jourAtt(login, other) {	
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'j_1', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot" style="font-style: italic"><div class="tabR">(' + XMY_montant + ') .</div></td>', true, 'POST', XMY_makeParams_publicidees(date, date), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr');	
	XMY_req_extractStats('j-1', 'j_1Att', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot"><div class="tabR">(' + XMY_montant + ') .</div></td>', false, 'POST', XMY_makeParams_publicidees(date, date), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_j_1Att(login, other) {
	var date = XMY_getDate('j-1', 'fr');	
	XMY_req_extractStats('j-1', 'mois', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot" style="font-style: italic"><div class="tabR">(' + XMY_montant + ') .</div></td>', true, 'POST', XMY_makeParams_publicidees(date, date), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_mois(login, other) {
	XMY_req_extractStats('mois', 'moisAtt', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot"><div class="tabR">(' + XMY_montant + ') .</div></td>', false, 'POST', XMY_makeParams_publicidees('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_moisAtt(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot" style="font-style: italic"><div class="tabR">(' + XMY_montant + ') .</div></td>', true, 'POST', XMY_makeParams_publicidees('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_m_1(login, other) {
	XMY_req_extractStats('m-1', 'm_1Att', 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot"><div class="tabR">(' + XMY_montant + ') .</div></td>', false, 'POST', XMY_makeParams_publicidees('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}
function XMY_getStats_publicidees_m_1Att(login, other) {
	var mois = XMY_getDate('m-1', 'fr');
	XMY_req_extractStats('m-1', null, 'publicidees', login, other, 'http://affilie.publicidees.com/index.php', '<td nowrap="nowrap" class="tabBorderTot" style="font-style: italic"><div class="tabR">(' + XMY_montant + ') .</div></td>', true, 'POST', XMY_makeParams_publicidees('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), null, '<td nowrap="nowrap"><div class="tabL"><strong>TOTAL</strong></div></td>');
}


function XMY_makeParams_publicidees(d1, d2) {
	return 'action=myresume&tout=1&dD=' + d1 + '&dF=' + d2;
}