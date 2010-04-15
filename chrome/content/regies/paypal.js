xmystats_regies[xmystats_regies.length] = { long: 'Paypal', court: 'paypal' };

var XMY_NbStats_paypal = 5;
var XMY_Wmc_paypal = 40;
var XMY_SiteWeb_paypal = 'http://www.paypal.fr/';
var XMY_RecupStats_paypal = 'OUI';


function XMY_param_paypal(login) {
	return {
		form: { 'method': 'post', 'action': 'https://www.paypal.com/fr/cgi-bin/webscr?cmd=_login-submit&dispatch=5885d80a13c0db1f80512b0980fcab74abc3e59231243d18fb86b96d6baa4d65' },
		input: { 'login_cmd': '', 'login_params': '', 'login_email': login, 'login_password': XMY_getPassword('paypal', login) },
	};
}


function XMY_getStats_paypal(login, other) {
	XMY_req_extractStats(null, 'login', 'paypal', login, other, 'https://www.paypal.com/fr/cgi-bin/webscr?cmd=_logout');
}
function XMY_getStats_paypal_login(login, other) {
	var form = XMY_param('paypal', login);
	XMY_req_extractStats(null, 'total', 'paypal', login, other, XMY_replace(XMY_req_extract(form['form']['action'], '<a href="([^"]+)">cliquez ici</a>', false, form['form']['method'], form['params']), '&amp;', '&'));
}
function XMY_getStats_paypal_total(login, other) {
	XMY_req_extractStats('total', 'mois', 'paypal', login, other, 'https://www.paypal.com/fr/cgi-bin/webscr?cmd=_account&nav=0.0', '<td class="small" align="center">.(' + XMY_montant + ') EUR</td>');
}
function XMY_getStats_paypal_mois(login, other) {	
	XMY_req_extractStats('mois', 'jour', 'paypal', login, other, 'https://business.paypal.com/acweb/servlet/ViewPage', '<NOBR>(' + XMY_montant + ')</NOBR>', false, 'GET', XMY_getObjectUrl_paypal(XMY_makeUrl_paypal('mois')) + '&format=DHTML&page=1&scalingfactor=100', null, 'CurrencyControl6');
}
function XMY_getStats_paypal_jour(login, other) {
	XMY_req_extractStats('jour', 'm_1', 'paypal', login, other, 'https://business.paypal.com/acweb/servlet/ViewPage', 'CLASS=C401[^<]+<NOBR>(' + XMY_montant + ')</NOBR>', true, 'GET', XMY_getObjectUrl_paypal(XMY_makeUrl_paypal('mois'), true) + '&format=DHTML&page=1&scalingfactor=100', null, '<NOBR>' + XMY_getDate('jour', 'uk') + '</NOBR>');
}
function XMY_getStats_paypal_m_1(login, other) {	
	XMY_req_extractStats('m-1', 'j_1', 'paypal', login, other, 'https://business.paypal.com/acweb/servlet/ViewPage', '<NOBR>(' + XMY_montant + ')</NOBR>', false, 'GET', XMY_getObjectUrl_paypal(XMY_makeUrl_paypal('m-1')) + '&format=DHTML&page=1&scalingfactor=100', null, 'CurrencyControl6');
}
function XMY_getStats_paypal_j_1(login, other) {
	XMY_req_extractStats('j-1', null, 'paypal', login, other, 'https://business.paypal.com/acweb/servlet/ViewPage', 'CLASS=C401[^<]+<NOBR>(' + XMY_montant + ')</NOBR>', true, 'GET', XMY_getObjectUrl_paypal(XMY_makeUrl_paypal( (XMY_getDate('j-1', 'fr').substr(3) == XMY_getDate('mois', 'fr') ? 'mois' : 'm-1') ), true) + '&format=DHTML&page=1&scalingfactor=100', null, '<NOBR>' + XMY_getDate('j-1', 'uk') + '</NOBR>');
}


function XMY_makeUrl_paypal(strMois) {
	var mois = XMY_getDate(strMois, 'fr').split('/');
	var lastMois = XMY_getDate('last-' + strMois, 'fr').split('/');
	return 'https://business.paypal.com/acweb/newrequest/do_executereport.jsp'
				+ '?invokeSubmit=true&__saveOutput=true&'
				+ '__executableName=/ReportExecutables/DailySalesReport/DailySalesReport.rox&ReportType=ADH'
				+ '&pTimeZone=Europe/London&pLocale=fr_FR&pLanguage=fr&locale=fr_FR'
				+ '&pBeginDay=1&pBeginMonth=' + parseInt(mois[0], 10) + '&pBeginYear=' + parseInt(mois[1], 10)
				+ '&pEndDay=' + parseInt(lastMois[0], 10) + '&pEndMonth=' + parseInt(lastMois[1], 10) + '&pEndYear=' + parseInt(lastMois[2], 10)
				+ '&isFullMonth=false&pCurrency=EUR&pObjectId=1217245166396'
}
function XMY_getObjectUrl_paypal(url, dontreload) {
	if(!dontreload) dontreload = false;
	return XMY_replace(XMY_replace(XMY_req_extract(url, 'var g_objectURL = "\\?([^"]+)', dontreload), '\\0455f', '_', true), '\\045', '%', true);
}