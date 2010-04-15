xmystats_regies[xmystats_regies.length] = { long: '1st Affiliation', court: '1staffiliation' };

var XMY_SiteWeb_1staffiliation = 'http://www.1st-affiliation.fr/';


function XMY_param_1staffiliation(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.1st-affiliation.fr/' },
		input: { 'login': login, 'pass': XMY_getPassword('1staffiliation', login) },
	};
}