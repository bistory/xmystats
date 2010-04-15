xmystats_regies[xmystats_regies.length] = { long: 'Advertstream', court: 'advertstream' };

var XMY_NbStats_advertstream = 4;
var XMY_Wmc_advertstream = 72;
var XMY_SiteWeb_advertstream = 'http://www.advertstream.com/';
var XMY_RecupStats_advertstream = 'PARTIEL';


function XMY_param_advertstream(login) {
	return {
		form: { 'method': 'get', 'action': 'http://adaccess3.advertstream.com/admin/index.php' },
		input: { 'username2': login, 'md5digest2': MD5(XMY_getPassword('advertstream', login)), 'direct': '1' },
	};
}


function XMY_getStats_advertstream(login, other) {
	var form = XMY_param('advertstream', login);
	XMY_req_extractStats('jour', 'j_1', 'advertstream', login, other, form['form']['action'], '<td  nowrap><font color="#ffffff">Aujourd\'hui :</font></a></td><td nowrap align="right"><b><font color="#ffffff">(' + XMY_montant + ')&euro;</font></td>', false, form['form']['method'], form['params']);
}
function XMY_getStats_advertstream_j_1(login, other) {
	var form = XMY_param('advertstream', login);
	XMY_req_extractStats('j-1', 'mois', 'advertstream', login, other, form['form']['action'], '<td  nowrap><font color="#ffffff">Hier:</font></a></td><td  nowrap align="right"><b><font color="#ffffff">(' + XMY_montant + ')&euro;</font></td>', true, form['form']['method'], form['params']);
}
function XMY_getStats_advertstream_mois(login, other) {
	var form = XMY_param('advertstream', login);
	XMY_req_extractStats('mois', 'total', 'advertstream', login, other, form['form']['action'], '<td  nowrap><font color="#ffffff">Ce mois :</font></td><td  nowrap align="right"><b><font color="#ffffff">(' + XMY_montant + ')&euro;</font></td>', true, form['form']['method'], form['params']);
}
function XMY_getStats_advertstream_total(login, other) {
	XMY_req_extractStats('total', null, 'advertstream', login, other, 'http://adaccess3.advertstream.com/admin/facturation/facturation_editeur.php', '>(' + XMY_montant + ') &euro; à payer \\[');
}