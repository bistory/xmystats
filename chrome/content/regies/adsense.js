xmystats_regies[xmystats_regies.length] = { long: 'Google Adsense', court: 'adsense' };

var XMY_Money_adsense = 'dollar';
var XMY_NbStats_adsense = 5;
var XMY_Wmc_adsense = 8;
var XMY_SiteWeb_adsense = 'http://www.google.com/adsense/?hl=fr';
var XMY_RecupStats_adsense = 'OUI';


function XMY_param_adsense(login) {
	return {
		form: { 'action': 'https://www.google.com/accounts/ServiceLoginAuth', 'method': 'post' },
		input: { 'ltmpl': 'login', 'continue': 'https://www.google.com/adsense/gaiaauth', 'followup': 'https://www.google.com/adsense/gaiaauth', 'service': 'adsense', 'nui': '3', 'ifr': 'true', 'rm': 'hide', 'hl': 'fr', 'alwf': 'true', 'Email': login, 'Passwd': XMY_getPassword('adsense', login) },
	};
}


function XMY_getStats_adsense(login, other) {
	var form = XMY_param('adsense', login);
	XMY_req_extractStats(null, 'redirect1', 'adsense', login, other, form['form']['action'], null, false, form['form']['method'], form['params'], 'https://www.google.com/adsense/');
}
var redirect1;
function XMY_getStats_adsense_redirect1(login, other) {
	var form = XMY_param('adsense', login);
	redirect1 = XMY_req_extract(form['form']['action'], '<center><a target="_top" href="([^"]+)" style="font-family: Arial, Helvetica, sans-serif; font-size: smaller;">Cliquez sur ce lien pour continuer</a></center>', true, form['form']['method'], form['params'], 'https://www.google.com/adsense/');
	XMY_req_extractStats(null, 'redirect2', 'adsense', login, other, redirect1);
}
function XMY_getStats_adsense_redirect2(login, other) {
	var temp = XMY_replace(XMY_req_extract(redirect1, "content=\"0; url='([^']+)'\"", true), '&amp;', '&');
	XMY_req_extractStats(null, 'total', 'adsense', login, other, temp, null, false, 'GET', null, redirect1);
}
function XMY_getStats_adsense_total(login, other) {
	XMY_req_extractStats('total', 'm_1', 'adsense', login, other, 'https://www.google.com/adsense/report/overview?timePeriod=sincelastpayment', '<td style="font-weight:bold;" nowrap>(' + XMY_montant + ') \\$US</td>', false, null, null, null, '<td style="text-align:left;">Total des gains</td>', null, Currencies.getConversionRatio('USD'));
}
function XMY_getStats_adsense_m_1(login, other) {
	XMY_req_extractStats('m-1', 'mois', 'adsense', login, other, 'https://www.google.com/adsense/report/overview?timePeriod=lastmonth', '<td style="font-weight:bold;" nowrap>(' + XMY_montant + ') \\$US</td>', false, null, null, null, '<td style="text-align:left;">Total des gains</td>', null, Currencies.getConversionRatio('USD'));
}
function XMY_getStats_adsense_mois(login, other) {
	XMY_req_extractStats('mois', 'j_1', 'adsense', login, other, 'https://www.google.com/adsense/report/overview?timePeriod=thismonth', '<td style="font-weight:bold;" nowrap>(' + XMY_montant + ') \\$US</td>', false, null, null, null, '<td style="text-align:left;">Total des gains</td>', null, Currencies.getConversionRatio('USD'));
}
function XMY_getStats_adsense_j_1(login, other) {
	XMY_req_extractStats('j-1', 'jour', 'adsense', login, other, 'https://www.google.com/adsense/report/overview?timePeriod=yesterday', '<td style="font-weight:bold;" nowrap>(' + XMY_montant + ') \\$US</td>', false, null, null, null, '<td style="text-align:left;">Total des gains</td>', null, Currencies.getConversionRatio('USD'));
}
function XMY_getStats_adsense_jour(login, other) {
	XMY_req_extractStats('jour', null, 'adsense', login, other, 'https://www.google.com/adsense/report/overview?timePeriod=today', '<td style="font-weight:bold;" nowrap>(' + XMY_montant + ') \\$US</td>', false, null, null, null, '<td style="text-align:left;">Total des gains</td>', null, Currencies.getConversionRatio('USD'));
}