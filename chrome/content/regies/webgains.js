xmystats_regies[xmystats_regies.length] = { long: 'Webgains', court: 'webgains' };

var XMY_Wmc_webgains = 67;
var XMY_SiteWeb_webgains = 'http://www.webgains.fr/';


function XMY_param_webgains(login) {
	var res = {
		form: { 'action': 'http://www.webgains.fr/index.html', 'method': 'post' },
		input: { 'usertype': 'affiliateuser', 'username': login, 'password': XMY_getPassword('webgains', login), 'submitbutton': 'LOGIN' },
	};
}