xmystats_regies[xmystats_regies.length] = { long: 'Miva', court: 'miva' };

var XMY_Wmc_miva = 6;
var XMY_SiteWeb_miva = 'http://www.miva.com/fr/';


function XMY_param_miva(login) {
	return {
		form: { 'method': 'post', 'action': 'https://account.fr.miva.com/partner/Account/login.asp?Action=Login' },
		input: { 'username': login, 'txtPasswordLogin': XMY_getPassword('miva', login) },
	};
}