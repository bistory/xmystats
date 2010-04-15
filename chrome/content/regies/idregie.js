xmystats_regies[xmystats_regies.length] = { long: 'IDRégie', court: 'idregie' };

var XMY_Wmc_idregie = 23;
var XMY_SiteWeb_idregie = 'http://www.idregie.com/';


function XMY_param_idregie(login) {
	return {
		form: { 'method': 'post', 'action': 'http://editeur.idregie.com/index.php' },
		input: { 'name': login, 'password': XMY_getPassword('idregie', login), 'command': 'Connexion' },
	};
}