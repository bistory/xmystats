xmystats_regies[xmystats_regies.length] = { long: 'IBase', court: 'ibase' };

var XMY_SiteWeb_ibase = 'http://www.ibase.fr/';


function XMY_param_ibase(login) {
	return {
		form: { 'method': 'post', 'action': 'http://reporting.ibase.fr/accueil.asp' },
		input: { 'user': login, 'pwd': XMY_getPassword('ibase', login), 'submit1': 'Authentification' },
	};
}