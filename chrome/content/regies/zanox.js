xmystats_regies[xmystats_regies.length] = { long: 'Zanox', court: 'zanox' };

var XMY_NbStats_zanox = 6;
var XMY_Wmc_zanox = 5;
var XMY_SiteWeb_zanox = 'http://www.zanox.fr/';
var XMY_RecupStats_zanox = 'OUI';


function XMY_param_zanox(login) {
	return {
		form: { 'action': 'https://ui.zanox-affiliate.de/bin/z_in_frm.dll?1001100110030&0c0&201_981202310868_113_201', 'method': 'post' },
		input: { 'fx_loginform': '', 't_login_user_name': login, 't_login_password': XMY_getPassword('zanox', login), 'b_next': 'Ouvrir une session' },
	};
}



var XMY_zanox_pageToLoad;
function XMY_getStats_zanox(login, other) {
	var form = XMY_param('zanox', login);
	XMY_req_extractStats('total', 'totalAtt', 'zanox', login, other, form['form']['action'], '<td style="color:#ffa000;"><b>(' + XMY_montant + ')</b> </td>', false, form['form']['method'], form['params']);
}
function XMY_getStats_zanox_totalAtt(login, other) {
	var form = XMY_param('zanox', login);
	XMY_req_extractStats('total', 'accueil', 'zanox', login, other, form['form']['action'], '<td><b>(' + XMY_montant + ')</b> </td>', true, form['form']['method'], form['params'], null, '<td style="color:#ffa000;"><b>');	
}
function XMY_getStats_zanox_accueil(login, other) {
	var form = XMY_param('zanox', login);
	XMY_zanox_pageToLoad = XMY_replace(XMY_req_extract(form['form']['action'], '<a href="([^"]+)" class="head_nav_main_normal">Mes statistiques</a>', true,  form['form']['method'], form['params']), '&amp;', '&');
	XMY_req_extractStats(null, 'stats', 'zanox', login, other, XMY_zanox_pageToLoad);
}
function XMY_getStats_zanox_stats(login, other) {
	XMY_zanox_pageToLoad = XMY_replace(XMY_req_extract(XMY_zanox_pageToLoad, '<a class="prmreiter_nonactiv" style="border:0px;" href="([^"]+)">', true, null, null, null, 'Realtime statistics (Today)'), '&amp;', '&');
	XMY_req_extractStats(null, 'mois', 'zanox', login, other, XMY_zanox_pageToLoad);
}
var XMY_zanox_pageToLoadMois;
function XMY_getStats_zanox_mois(login, other) {
	XMY_zanox_pageToLoadMois = XMY_replace(XMY_req_extract(XMY_zanox_pageToLoad, '<form method="post" action="([^"]+)" id="fx_form" name="tstest">', true), '&amp;', '&');
	var mois = XMY_getDate('mois', 'fr.');
	XMY_req_extractStats('mois', 'm_1', 'zanox', login, other, XMY_zanox_pageToLoadMois, XMY_montant + '  </div>[^0-9]+(' + XMY_montant + ')  </div>', false, 'POST', XMY_makeParams_zanox(mois), null, '<td class="tabellen_foot">Total </td>');
}
var XMY_zanox_pageToLoadMoisPrec;
function XMY_getStats_zanox_m_1(login, other) {
	var mois = XMY_getDate('mois', 'fr.');
	XMY_zanox_pageToLoadMoisPrec = XMY_replace(XMY_req_extract(XMY_zanox_pageToLoadMois, '<form method="post" action="([^"]+)" id="fx_form" name="tstest">', true, 'POST', XMY_makeParams_zanox(mois)), '&amp;', '&');
	var mois = XMY_getDate('m-1', 'fr.');
	XMY_req_extractStats('m-1', 'jour', 'zanox', login, other, XMY_zanox_pageToLoadMoisPrec, XMY_montant + '  </div>[^0-9]+(' + XMY_montant + ')  </div>', false, 'POST', XMY_makeParams_zanox(mois), null, '<td class="tabellen_foot">Total </td>');
}
function XMY_getStats_zanox_jour(login, other) {
	var mois = XMY_getDate('mois', 'fr.');
	var jour = XMY_getDate('jour', 'fr.');
	XMY_req_extractStats('jour', 'j_1', 'zanox', login, other, XMY_zanox_pageToLoadMois, '<td class="tabellen_inhalt" align="right">' + XMY_montant + ' </td>[^0-9]+<td class="tabellen_inhalt" align="right">(' + XMY_montant + ') </td>', true, 'POST', XMY_makeParams_zanox(mois), null, '>' + jour + ' (');
}
function XMY_getStats_zanox_j_1(login, other) {
	var myPage = XMY_zanox_pageToLoadMois;
	var mois = XMY_getDate('mois', 'fr.');
	var jour = XMY_getDate('j-1', 'fr.');
	if(jour.substr(3) != mois) {
		mois = XMY_getDate('m-1', 'fr.');
		myPage = XMY_zanox_pageToLoadMoisPrec;
	}
	XMY_req_extractStats('j-1', null, 'zanox', login, other, myPage, '<td class="tabellen_inhalt" align="right">' + XMY_montant + ' </td>[^0-9]+<td class="tabellen_inhalt" align="right">(' + XMY_montant + ') </td>', true, 'POST', XMY_makeParams_zanox(mois), null, '>' + jour + ' (');
}





function XMY_makeParams_zanox(mois, jour) {
	var bout;
	var myMois;
	var myAnnee;
	if(jour) {
		bout = jour.split('.');
		myMois = bout[1];
		myAnnee = bout[2]; 
	} else {
		bout = mois.split('.');
		myMois = bout[0];
		myAnnee = bout[1];
	}
	myMois = parseInt(myMois, 10);
	return 'b_next=any&d_periode_year=' + myAnnee + '&d_periode_month=' + myMois + '&d_periode_week=0' + (jour ? '&t_date=' + jour : '') + '&t_date=&d_website_name=0&d_adbox_name=0&d_prog_name=0&d_link_name=0&d_accounting_currency=1&c_show_view=c_show_view&c_show_click=c_show_click&c_show_lead=c_show_lead&c_show_sale=c_show_sale&d_screen_file=0&d_group=1';
}