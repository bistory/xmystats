xmystats_regies[xmystats_regies.length] = { long: 'ReactivPub', court: 'reactivpub' };

var XMY_NbStats_reactivpub = 5;
var XMY_Wmc_reactivpub = 10;
var XMY_SiteWeb_reactivpub = 'http://www.reactivpub.com/';
var XMY_RecupStats_reactivpub = 'OUI';


function XMY_param_reactivpub(login) {
	XMY_req_extract('http://www.reactivpub.com/fr', null, false, 'POST', 'login=' + login + '&password=' + XMY_getPassword('reactivpub', login) + '&reason=login', 'Referer: http://www.reactivpub.com/');
	
	return {
		form: { 'method': 'get', 'action': 'http://www.reactivpub.com/fr/backoffice' },
		input: {}
	};
}


function XMY_getStats_reactivpub(login, other) {
	var form = XMY_param('reactivpub', login);
	XMY_req_extractStats(null, 'mois', 'reactivpub', login, other, form['form']['action'], null, false, form['form']['method'], form['params']);
}
function XMY_getStats_reactivpub_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'reactivpub', login, other, XMY_makeUrl_reactivpub('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), '<td align="right" class=" value">(' + XMY_montant + ')</td>', false, 'GET', null, null, '<td class="separator label">Total global :</td>'); 
}
function XMY_getStats_reactivpub_m_1(login, other) {
	XMY_req_extractStats('m-1', 'jour', 'reactivpub', login, other, XMY_makeUrl_reactivpub('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), '<td align="right" class=" value">(' + XMY_montant + ')</td>', false, 'GET', null, null, '<td class="separator label">Total global :</td>'); 
}
function XMY_getStats_reactivpub_jour(login, other) {
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'j_1', 'reactivpub', login, other, XMY_makeUrl_reactivpub(date, date), '<td align="right" class=" value">(' + XMY_montant + ')</td>', false, 'GET', null, null, '<td class="separator label">Total global :</td>'); 
}
function XMY_getStats_reactivpub_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr');
	XMY_req_extractStats('j-1', 'total', 'reactivpub', login, other, XMY_makeUrl_reactivpub(date, date), '<td align="right" class=" value">(' + XMY_montant + ')</td>', false, 'GET', null, null, '<td class="separator label">Total global :</td>'); 
}
function XMY_getStats_reactivpub_total(login, other) {
	XMY_req_extractStats('total', null, 'reactivpub', login, other, 'http://www.reactivpub.com/fr/factures/synthese', 'Vos gains facturables s\'élèvent à <strong>(' + XMY_montant + ')', false, 'POST', 'rechercher=rechercher&tab=6&page=1&id_etat_facture=6&num_facture=&date_mini=&date_maxi=&results_per_page=15'); 
}


function XMY_makeUrl_reactivpub(d1, d2) {
	return 'http://www.reactivpub.com/fr/statistiques/results?eCPM=0&eCPC=0&date_mini=' + d1 + '&date_maxi=' + d2;
}