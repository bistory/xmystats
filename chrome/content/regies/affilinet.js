xmystats_regies[xmystats_regies.length] = { long: 'Affili.net', court: 'affilinet' };

var XMY_NbStats_affilinet = 10;
var XMY_Wmc_affilinet = 4;
var XMY_SiteWeb_affilinet = 'http://www.affili.net/';
var XMY_RecupStats_affilinet = 'OUI';


function XMY_param_affilinet(login) {
	var viewstate = XMY_req_extract('http://publisher.affili.net/Login/NewLogin.aspx', '<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)" />', false);
	var eventvalidation = XMY_req_extract('http://publisher.affili.net/Login/NewLogin.aspx', '<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)" />', true);

	return {
		form: { 'action': 'http://publisher.affili.net/Login/NewLogin.aspx', 'method': 'post' },
		input: { '__VIEWSTATE': viewstate, 'ctl00$AffilinetpShift': '1', 'ctl00$AffilinetpSize': '30', 'ctl00$AffilinetParameter': '', 'ctl00$txtLogin': login, 'ctl00$txtPassword': XMY_getPassword('affilinet', login), 'ctl00$btnLogin.x': '1', 'ctl00$btnLogin.y': '1', 'ctl00$drpLanguageSelect': 'fr', '__EVENTTARGET': '', '__EVENTARGUMENT': '', '__EVENTVALIDATION': eventvalidation },
	};
}


function XMY_getStats_affilinet(login, other) {
	XMY_req_extractStats(null, 'login', 'affilinet', login, other, 'http://publisher.affili.net/Login/Logout.aspx');
}
var XMY_form_affilinet;
function XMY_getStats_affilinet_login(login, other) {
	XMY_form_affilinet = XMY_param('affilinet', login);
	XMY_req_extractStats('total', 'totalAtt', 'affilinet', login, other, XMY_form_affilinet['form']['action'], '<td  class="txt_blue_bold "><a id="ctl00_ctl00_ContentPlaceHolderContent_Frame2TopInfo_AccControl_lblAccountActualValue" href="\\.\\./Statistics/detailsPerDay\\.aspx\\?cd=1" style="text-decoration:none;">(' + XMY_montant + ') .</a></td>', false, XMY_form_affilinet['form']['method'], XMY_form_affilinet['params']);
}
function XMY_getStats_affilinet_totalAtt(login, other) {
	XMY_req_extractStats('total', 'mois', 'affilinet', login, other, XMY_form_affilinet['form']['action'], '<td class="txt_blue_bold"><a id="ctl00_ctl00_ContentPlaceHolderContent_Frame2TopInfo_AccControl_lblAccountOpenValue" href="\\.\\./Statistics/salesLeads\\.aspx\\?status=0" style="text-decoration:none;">(' + XMY_montant + ') .</a></td>', true, XMY_form_affilinet['form']['method'], XMY_form_affilinet['params']);
}
function XMY_getStats_affilinet_mois(login, other) {
	XMY_req_extractStats('mois', 'moisAtt', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="SumFooter DefaultMoneyWidth" colspan="1">(' + XMY_montant + ')</td>', false);
}
function XMY_getStats_affilinet_moisAtt(login, other) {
	XMY_req_extractStats('mois', 'jour', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="EuroFooterGray DefaultMoneyWidth" colspan="1">(' + XMY_montant + ')</td>', true, null, null, null, '<td class="EuroFooterGray DefaultMoneyWidth" colspan="1">');
}
function XMY_getStats_affilinet_jour(login, other) {
	var date = XMY_getDate('jour', 'fr2');
	XMY_req_extractStats('jour', 'jourAtt', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="SumBodyAll DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, null, null, null, '>' + date + '<');
}
function XMY_getStats_affilinet_jourAtt(login, other) {
	var date = XMY_getDate('jour', 'fr2');
	XMY_req_extractStats('jour', 'm_1', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', 'SalesBodyDeleted.*SalesBodyOpen.*<td class="SalesBodyOpen DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, null, null, null, '>' + date + '<');
}
function XMY_getStats_affilinet_m_1(login, other) {
	var temp_viewstate = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)" />', true);
	var temp_eventvalidation = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)" />', true);
	XMY_req_extractStats('m-1', 'm_1Att', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="SumFooter DefaultMoneyWidth" colspan="1">(' + XMY_montant + ')</td>', false, 'POST', XMY_makeParams_affilinet('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr'), temp_viewstate, temp_eventvalidation));
}
function XMY_getStats_affilinet_m_1Att(login, other) {
	var temp_viewstate = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)" />', true);
	var temp_eventvalidation = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)" />', true);
	XMY_req_extractStats('m-1', 'j_1', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="EuroFooterGray DefaultMoneyWidth" colspan="1">(' + XMY_montant + ')</td>', true, 'POST', XMY_makeParams_affilinet('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr'), temp_viewstate, temp_eventvalidation), null, '<td class="EuroFooterGray DefaultMoneyWidth" colspan="1">');
}
function XMY_getStats_affilinet_j_1(login, other) {
	var date = XMY_getDate('j-1', 'fr2');
	var moisComp = XMY_getDate('j-1', 'fr').substr(3);
	var mois = XMY_getDate('mois', 'fr');
	if(mois != moisComp) {
		var temp_viewstate = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)" />', true);
		var temp_eventvalidation = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)" />', true);
		XMY_req_extractStats('j-1', 'j_1Att', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="SumBodyAll DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, 'POST', XMY_makeParams_affilinet('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr'), temp_viewstate, temp_eventvalidation), null, '>' + date + '<');
	} else {
		XMY_req_extractStats('j-1', 'j_1Att', 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<td class="SumBodyAll DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, null, null, null, '>' + date + '<');
	}
}
function XMY_getStats_affilinet_j_1Att(login, other) {
	var date = XMY_getDate('j-1', 'fr2');
	var moisComp = XMY_getDate('j-1', 'fr').substr(3);
	var mois = XMY_getDate('mois', 'fr');
	if(mois != moisComp) {
		var temp_viewstate = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)" />', true);
		var temp_eventvalidation = XMY_req_extract('http://publisher.affili.net/Statistics/detailsPerDay.aspx', '<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)" />', true);
		XMY_req_extractStats('j-1', null, 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', 'SalesBodyDeleted.*SalesBodyOpen.*<td class="SalesBodyOpen DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, 'POST', XMY_makeParams_affilinet('01/' + XMY_getDate('m-1', 'fr'), XMY_getDate('last-m-1', 'fr'), temp_viewstate, temp_eventvalidation), null, '>' + date + '<');
	} else {
		XMY_req_extractStats('j-1', null, 'affilinet', login, other, 'http://publisher.affili.net/Statistics/detailsPerDay.aspx', 'SalesBodyDeleted.*SalesBodyOpen.*<td class="SalesBodyOpen DefaultMoneyWidth [a-zA-Z]+">(' + XMY_montant + ')</td>', true, null, null, null, '>' + date + '<');
	}
}


function XMY_makeParams_affilinet(d1, d2, viewstate, eventvalidation) {
	return '__VIEWSTATE=' + XMY_URLEncode(viewstate) +
		'&' + 'ctl00%24ctl00%24AffilinetpShift=1' +
		'&' + 'ctl00%24ctl00%24AffilinetpSize=30' +
		'&' + 'ctl00%24ctl00%24AffilinetParameter=' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dropdownMonthYear=-1' + 
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24cblistSelectProgramType%240=on' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24cblistSelectProgramType%241=on' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24cblistSelectProgramType%242=on' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24listSelectProgramID=0' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dropdownQuarterWeek=-1' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dropdownQuarterWeekYear=-1' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dlFrom=' + d1 +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dlTo=' + d2 +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dropDownExport=CSV' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24tbSubID=' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24dropdownSubIDPattern=%24pattern%24' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24rblistSelectDateType=0' +
		'&' + 'ctl00%24ctl00%24ContentPlaceHolderContent%24Frame1Content%24StatisticMenu%24btnSearch=Rechercher' +		
		'&' + '__EVENTVALIDATION=' + XMY_URLEncode(eventvalidation);	
}