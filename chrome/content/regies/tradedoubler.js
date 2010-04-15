xmystats_regies[xmystats_regies.length] = { long: 'TradeDoubler', court: 'tradedoubler' };

var XMY_NbStats_tradedoubler = 5;
var XMY_Wmc_tradedoubler = 3;
var XMY_SiteWeb_tradedoubler = 'http://www.tradedoubler.com/';
var XMY_RecupStats_tradedoubler = 'OUI';


function XMY_param_tradedoubler(login) {
	return {
		form: { 'action': 'http://www.tradedoubler.com/pan/login', 'method': 'post' },
		input: { 'j_username': login, 'j_password': XMY_getPassword('tradedoubler', login), 'originalLocale': 'fr_FR' },
	};
}


function XMY_getStats_tradedoubler(login, other) {
	XMY_req_extractStats(null, 'login', 'tradedoubler', login, other, 'http://www.tradedoubler.com/pan/logout.jsp');
}
function XMY_getStats_tradedoubler_login(login, other) {
	var form = XMY_param('tradedoubler', login);
	XMY_req_extractStats('total', 'jour', 'tradedoubler', login, other, form['form']['action'], '<span class="darkBig"> (' + XMY_montant + ')</span>', false, form['form']['method'], form['params']);
}
function XMY_getStats_tradedoubler_jour(login, other) {
	var date = XMY_getDate('jour', 'fr');
	XMY_req_extractStats('jour', 'j_1', 'tradedoubler', login, other, XMY_makeUrl_tradedoubler(date, date), '(' + XMY_montant + ')', false, null, null, null, '<!-- 1 -->', '<!-- 2 -->');
}
function XMY_getStats_tradedoubler_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr');
	XMY_req_extractStats('j-1', 'mois', 'tradedoubler', login, other, XMY_makeUrl_tradedoubler(date, date), '(' + XMY_montant + ')', false, null, null, null, '<!-- 1 -->', '<!-- 2 -->');
}
function XMY_getStats_tradedoubler_mois(login, other) {
	XMY_req_extractStats('mois', 'm_1', 'tradedoubler', login, other, XMY_makeUrl_tradedoubler('01/' + XMY_getDate('mois', 'fr'), XMY_getDate('last-mois', 'fr')), '(' + XMY_montant + ')', false, null, null, null, '<!-- 1 -->', '<!-- 2 -->');
}
function XMY_getStats_tradedoubler_m_1(login, other) {
	XMY_req_extractStats('m-1', null, 'tradedoubler', login, other, XMY_makeUrl_tradedoubler('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr')), '(' + XMY_montant + ')', false, null, null, null, '<!-- 1 -->', '<!-- 2 -->');
}


function XMY_makeUrl_tradedoubler(d1, d2) {
	return 'http://www.tradedoubler.com/pan/aReport3.action?reportName=aAffiliateProgramOverviewReport&columns=affiliateCommission&startDate=' + d1 + '&endDate=' + d2 + '&currencyId=EUR&period=custom_period&format=HTML&decorator=popupDecorator&applyNamedDecorator=true';
}