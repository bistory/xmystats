xmystats_regies[xmystats_regies.length] = { long: 'Commission Junction', court: 'cj' };

var XMY_NbStats_cj = 5;
var XMY_Wmc_cj = 44;
var XMY_SiteWeb_cj = 'http://fr.cj.com/';
var XMY_RecupStats_cj = 'OUI';


function XMY_param_cj(login) {
	return {
		form: { 'method': 'post', 'action': 'https://members.cj.com/member/foundation/memberlogin.do' },
		input: { 'uname': login, 'pw': XMY_getPassword('cj', login) },
	};
}


function XMY_getStats_cj(login, other) {
	var form = XMY_param('cj', login);
	XMY_req_extractStats(null, 'total', 'cj', login, other, form['form']['action'], null, false, form['form']['method'], form['params']);
}
function XMY_getStats_cj_total(login, other) {
	XMY_req_extractStats('total', 'mois', 'cj', login, other, 'https://members.cj.com/member/publisher/report/transaction.do', '<b>(' + XMY_montant + ') . EUR</b>', false, 'GET', null, null, '<b>Total</b>');
}
function XMY_getStats_cj_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'cj', login, other, XMY_makeUrl_cj('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+<td  class="curr">(' + XMY_montant + ') .</td>', false, 'GET', null, null, '<tr class="reportTotalRow">');
}
function XMY_getStats_cj_m_1(login, other) {
	XMY_req_extractStats('m-1', 'jour', 'cj', login, other, XMY_makeUrl_cj('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+<td  class="curr">(' + XMY_montant + ') .</td>', false, 'GET', null, null, '<tr class="reportTotalRow">');
}
function XMY_getStats_cj_jour(login, other) {
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'j_1', 'cj', login, other, XMY_makeUrl_cj(date, date), XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+<td  class="curr">(' + XMY_montant + ') .</td>', false, 'GET', null, null, '<tr class="reportTotalRow">');
}
function XMY_getStats_cj_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr');
	XMY_req_extractStats('j-1', null, 'cj', login, other, XMY_makeUrl_cj(date, date), XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+' + XMY_montant + '[^0-9]+<td  class="curr">(' + XMY_montant + ') .</td>', false, 'GET', null, null, '<tr class="reportTotalRow">');
}


function XMY_makeUrl_cj(d1, d2) {
	var date1 = d1.split('/');
	var date2 = d2.split('/');
	return 'https://members.cj.com/member/publisher/report/transaction.do?what=commByDt&whatsub=commByDt&cid=&actionname=0&status=&actiontype=&website=&sortKey=date&sortOrder=DESC&period=range&startday=' + date1[0] + '&startmonth=' + (date1[1]-1) + '&startyear=' + date1[2] + '&endday=' + date2[0] + '&endmonth=' + (date2[1]-1) + '&endyear=' + date2[2];
}