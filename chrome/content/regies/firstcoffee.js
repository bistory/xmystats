xmystats_regies[xmystats_regies.length] = { long: 'FirstCoffee Network', court: 'firstcoffee' };

var XMY_NbStats_firstcoffee = 5;
var XMY_SiteWeb_firstcoffee = 'http://network.first-coffee.com/';
var XMY_RecupStats_firstcoffee = 'OUI';


function XMY_param_firstcoffee(login) {
	return {
		form: { 'method': 'post', 'action': 'http://network.first-coffee.com/' },
		input: { 'login': login, 'mdp': XMY_getPassword('firstcoffee', login), 'logas': '1' },
	};
}


function XMY_getStats_firstcoffee(login, other) {
	XMY_req_extractStats(null, 'login', 'firstcoffee', login, other, 'http://network.first-coffee.com/logout.php', null, false);
}
function XMY_getStats_firstcoffee_login(login, other) {
	var form = XMY_param('firstcoffee', login);
	XMY_req_extractStats(null, 'jour', 'firstcoffee', login, other, form['form']['action'], null, false, form['form']['method'], form['params']);
}
function XMY_getStats_firstcoffee_jour(login, other) {
	XMY_req_extractStats('jour', 'j_1', 'firstcoffee', login, other, 'http://network.first-coffee.com/index.php?page=stats&cas=20&p1=1', '<td align="right" class="tablo_entete_gris_clair" nowrap>(' + XMY_montant + ')&euro;</td>', false, 'POST', 'coef_simul=100', null, '<td align="right" class="tablo_petit_txtrouge" nowrap>');
}
function XMY_getStats_firstcoffee_j_1(login, other) {
	XMY_req_extractStats('j-1', 'mois', 'firstcoffee', login, other, 'http://network.first-coffee.com/index.php?page=stats&cas=20&p1=8', '<td align="right" class="tablo_entete_gris_clair" nowrap>(' + XMY_montant + ')&euro;</td>', false, 'POST', 'coef_simul=100', null, '<td align="right" class="tablo_petit_txtrouge" nowrap>');
}
function XMY_getStats_firstcoffee_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'firstcoffee', login, other, 'http://network.first-coffee.com/index.php?page=stats&cas=20&p1=3', '<td align="right" class="tablo_entete_gris_clair" nowrap>(' + XMY_montant + ')&euro;</td>', false, 'POST', 'coef_simul=100', null, '<td align="right" class="tablo_petit_txtrouge" nowrap>');
}
function XMY_getStats_firstcoffee_m_1(login, other) {
	XMY_req_extractStats('m-1', 'total', 'firstcoffee', login, other, 'http://network.first-coffee.com/index.php?page=stats&cas=20&p1=7', '<td align="right" class="tablo_entete_gris_clair" nowrap>(' + XMY_montant + ')&euro;</td>', false, 'POST', 'coef_simul=100', null, '<td align="right" class="tablo_petit_txtrouge" nowrap>');
}
function XMY_getStats_firstcoffee_total(login, other) {
	XMY_req_extractStats('total', null, 'firstcoffee', login, other, 'http://network.first-coffee.com/index.php?page=remu_new', '<td align="right" class="bodyaide1"><b>(' + XMY_montant + ')</b>  </td>', false, null, null, null, '<td class="bodyaide1"> <b>Total');
}