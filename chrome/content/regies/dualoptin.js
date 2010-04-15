xmystats_regies[xmystats_regies.length] = { long: 'DualOptin', court: 'dualoptin' };

var XMY_SiteWeb_dualoptin = 'http://www.dualoptin.com/';


function XMY_param_dualoptin(login) {
	return {
		form: { 'method': 'post', 'action': 'http://www.dualoptin.com/admin/login' },
		input: { 'coreg_client[username]': login, 'coreg_client[password]': XMY_getPassword('dualoptin', login) },
	};
}