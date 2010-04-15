xmystats_regies[xmystats_regies.length] = { long: 'ValueClick Media', court: 'valueclick' };

var XMY_Wmc_valueclick = 15;
var XMY_SiteWeb_valueclick = 'http://www.valueclickmedia.fr/';


function XMY_param_valueclick(login) {
	return {
		form: { 'action': 'http://www.valueclickmedia.fr/', 'method': 'post' },
		input: { 'LOGIN': login, 'PASSWORD': XMY_getPassword('valueclick', login) },
	};
}