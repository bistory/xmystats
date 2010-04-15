xmystats_regies[xmystats_regies.length] = { long: 'Adverline', court: 'adverline' };

var XMY_Wmc_adverline = 14;
var XMY_SiteWeb_adverline = 'http://www.adverline.com/';


function XMY_param_adverline(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.adverline.com/login.php' },
		input: { 'username': login, 'password': XMY_getPassword('adverline', login), 'access': '2' },
	};
}