xmystats_regies[xmystats_regies.length] = { long: 'RentaDial', court: 'rentadial' };

var XMY_SiteWeb_rentadial = 'http://www.rentadial.com/';


function XMY_param_rentadial(login) {
	return {
		form: { 'action': 'http://www.rentadial.com/valid_form.php', 'method': 'post' },
		input: { 'email_user': login, 'password_user': XMY_getPassword('rentadial', login), 'button': 'OK', 'lg': 'fr', 'Do': '', 'p': 'SiteLogIn', 'submit_login': 'Sauvegarder' },
	};
}