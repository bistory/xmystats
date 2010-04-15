xmystats_regies[xmystats_regies.length] = { long: 'Gestion Pub', court: 'gestionpub' };

var XMY_SiteWeb_gestionpub = 'http://www.gestionpub.com/';


function XMY_param_gestionpub(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.gestionpub.com/index.asp' },
		input: { 'Check': '', 'Login': login, 'Pw': XMY_getPassword('gestionpub', login) },
	};
}