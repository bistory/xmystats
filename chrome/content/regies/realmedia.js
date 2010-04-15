xmystats_regies[xmystats_regies.length] = { long: 'RealMedia', court: 'realmedia' };

var XMY_Wmc_realmedia = 27;
var XMY_SiteWeb_realmedia = 'http://www.247realmedia.fr/';


function XMY_param_realmedia(login) {
	return {
		form: { 'method': 'post', 'action': 'https://test-tools.247realmedia.com/bob/' },
		input: { 'login': login, 'mdp': XMY_getPassword('realmedia', login) },
	};
}