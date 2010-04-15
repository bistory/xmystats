xmystats_regies[xmystats_regies.length] = { long: 'Ticket-Surf', court: 'ticketsurf' };

var XMY_Wmc_ticketsurf = 38;
var XMY_SiteWeb_ticketsurf = 'http://www.ticket-surf.com/';


function XMY_param_ticketsurf(login) {
	return {
		form: { 'action': 'http://nts0.ticket-surf.com/NTS/SCRIPTS/TPM/identificationMerchant.php', 'method': 'post' },
		input: { 'login': login, 'password': XMY_getPassword('ticketsurf', login), 'Submit': 'Valider' },
	};
}