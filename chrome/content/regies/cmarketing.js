xmystats_regies[xmystats_regies.length] = { long: 'C-Marketing', court: 'cmarketing' };

var XMY_Wmc_cmarketing = 21;
var XMY_SiteWeb_cmarketing = 'http://www.c-marketing.fr/';
var XMY_SuppFields_cmarketing = { pourcentage: 'Pourcentage' };
var XMY_RecupStats_cmarketing = 'PARTIEL';
var XMY_NbStats_cmarketing = 3;


function XMY_param_cmarketing(login) {
	var temp = login.split(xmystats_separator2);
	
	return {
		form: { 'action': 'https://aimfar-ui.weborama.com/login/login', 'method': 'post' },
		input: { 'user_login': temp[0], 'user_password': XMY_getPassword('cmarketing', temp[0]), 'commit': 'Connexion' },
	};
}


function XMY_getStats_cmarketing(login, other) {
	other = parseInt(other, 10);
	if(isNaN(other)) other = 100;
	XMY_req_extractStats('mois', 'm_1', 'cmarketing', login, other, XMY_makeUrl_cmarketing(login, XMY_getPassword('cmarketing', login), XMY_getDate('mois', 'us') + "-01", XMY_getDate('last-mois', 'us')), '<ca>(' + XMY_montant + ')</ca>', false, 'GET', null, null, null, null, other/100, true);
}
function XMY_getStats_cmarketing_m_1(login, other) {
	var mois = XMY_getDate('m-1', 'us');
	other = parseInt(other, 10);
	if(isNaN(other)) other = 100;
	XMY_req_extractStats('m-1', 'j_1', 'cmarketing', login, other, XMY_makeUrl_cmarketing(login, XMY_getPassword('cmarketing', login), XMY_getDate('m-1', 'us') + "-01", XMY_getDate('last-m-1', 'us')), '<ca>(' + XMY_montant + ')</ca>', false, 'GET', null, null, null, null, other/100, true);
}
function XMY_getStats_cmarketing_j_1(login, other) {
	other = parseInt(other, 10);
	if(isNaN(other)) other = 100;
	
	var date = XMY_getDate('j-1', 'us');
	var mois = XMY_getDate('mois', 'us');
	var isMois = (date.substr(0, date.length - 3) == mois);
	
	var mois = (isMois ? mois : XMY_getDate('m-1', 'us'));
	var lastMois = (isMois ? XMY_getDate('last-mois', 'us') : XMY_getDate('last-m-1', 'us'));
	
	XMY_req_extractStats('j-1', null, 'cmarketing', login, other, XMY_makeUrl_cmarketing(login, XMY_getPassword('cmarketing', login), mois + "-01", lastMois), '<ca>(' + XMY_montant + ')</ca>', true, 'GET', null, null, '<jour>' + date + '</jour>', null, other/100);
}


function XMY_makeUrl_cmarketing(login, password, dateDebut, dateFin) {
	return 'https://aimfar-ui.weborama.com/xml/flux/getstatsite?LOGIN=' + login + '&MDP=' + password + '&DATE_DEB=' + dateDebut + '&DATE_FIN=' + dateFin;
}