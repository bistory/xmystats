xmystats_regies[xmystats_regies.length] = { long: 'Rentabiliweb', court: 'rentabiliweb' };

var XMY_NbStats_rentabiliweb = 1;
var XMY_SiteWeb_rentabiliweb = 'http://www.rentabiliweb.com/';
var XMY_RecupStats_rentabiliweb = 'PARTIEL';


function XMY_param_rentabiliweb(login) {
	return {
		form: { 'action': 'http://www.rentabiliweb.com/admin/dologin.php', 'method': 'post' },
		input: { 'login': login, 'mdp': XMY_getPassword('rentabiliweb', login) },
	};
}


function XMY_getStats_rentabiliweb(login, other) {
	var form = XMY_param('rentabiliweb', login);
	XMY_req_extractStats('total', null, 'rentabiliweb', login, other, form['form']['action'], '<strong>(' + XMY_montant + ') &euro;</strong>', false, form['form']['method'], form['params'], null, 'Gains actuels:<br>');
}