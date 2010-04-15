xmystats_regies[xmystats_regies.length] = { long: 'MIXAD', court: 'mixad' };

var XMY_SiteWeb_mixad = 'http://webmasters.clubannonces.com/';


function XMY_param_mixad(login) {
	return {
		form: { 'method': 'post', 'action': 'http://webmasters.clubannonces.com/system/login/login_identification.asp' },
		input: { 'url': '/news.asp', 'LOGIN': login, 'PASSWORD': XMY_getPassword('mixad', login) },
	};
}