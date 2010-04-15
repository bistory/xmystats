var xmystats_compte = null;

var xmystats_regie			= null;
var xmystats_regie_libelle	= null;

// Initialiser les options
function XMY_initOptions(obj) {
	var elt		= document.getElementById('xmystats-page-list');
	var listi 	= null;
	var sel		= false;
	for (var a in xmystats_regies) {
		listi = document.createElement('listitem');
		if (!sel) {
			sel = true;
			xmystats_regie = xmystats_regies[a]['court'];
			xmystats_regie_libelle = xmystats_regies[a]['long'];
		}
		listi.setAttribute('label', xmystats_regies[a]['long']);
		listi.setAttribute('value', xmystats_regies[a]['court']);
		elt.appendChild(listi);
	}
	
	XMY_loadComptes();
}

// Modifier les comptes d'une régie
function XMY_changePage(obj) {
	xmystats_regie = obj.selectedItem.value;
	xmystats_regie_libelle = obj.selectedItem.label;
	XMY_loadComptes();
}

// Recharger les comptes d'une régie
function XMY_loadComptes() {
	var regie = xmystats_regie;
	
	var iframe = document.getElementById('xmystats-options-iframe');
	iframe.setAttribute('src', 'about:blank');
	iframe.setAttribute('src', 'chrome://xmystats/content/options/pages/comptes.xul');
	
	function XMY_loadComptes_temp(event) {
		var suppFields = XMY_issetor('XMY_SuppFields_' + regie);
		if(suppFields != null) {
			var pagedocument = document.getElementById('xmystats-options-iframe').contentDocument;
			var listHead = pagedocument.getElementById('xmystats-listbox-listhead');
			for(var a in suppFields) {
				var listHeader = pagedocument.createElement('listheader');
				listHeader.setAttribute('label', suppFields[a]);
				listHead.appendChild(listHeader);
			}
		}
		iframe.removeEventListener('load', XMY_loadComptes_temp, true);
	}
	iframe.addEventListener('load', XMY_loadComptes_temp, true);
}

// Ajouter une ligne pour un compte
function XMY_addLigneCompte(compte, edit_item) {
	var pagedocument = document.getElementById('xmystats-options-iframe').contentDocument;
	var liste = pagedocument.getElementById('xmystats-listbox');

	if(edit_item == null) {
		edit_item = false;
	}
	
	if(!edit_item) {
		var listItem	= pagedocument.createElement('listitem');
	} else {
		var listItem	= liste.selectedItem;
	}
	
	for(var a in compte) {
		if(a == 'password') continue;
		var listCell = pagedocument.createElement('listcell');
		listCell.setAttribute('label', compte[a]);
		listItem.appendChild(listCell);
	}

	if(!edit_item) {
		liste.selectItem(liste.appendChild(listItem));
	}
	liste.ensureElementIsVisible(liste.selectedItem);
}

// Concaténer le compte passé en paramètres à la chaîne de caractères des comptes (premier paramètre)
function XMY_concatCompte(compte) {
	var str = "";
	var sep = "";
	for(var a in compte) {
		if(a == 'password') continue;
		str += sep + compte[a];
		sep = xmystats_separator2;
	}	
	return str + xmystats_separator1;
}

// Ajouter un compte
function XMY_addCompte() {
	var regie = xmystats_regie;
	
	window.openDialog('chrome://xmystats/content/' + ( XMY_issetor('XMY_SuppFields_' + regie) != null ? 'regies/add-pages/' + regie + '.xul' : 'options/pages/add.xul' ), 'xmystats-resize-dialog', 'centerscreen,chrome,modal', 'add');
	
	if(xmystats_compte != null) {

		XMY_addLigneCompte(xmystats_compte);

		var str = 'comptes.' + regie + '.liste';
		var liste = XMY_prefGetString(str);
		if (!liste) liste = '';
		
		liste += XMY_concatCompte(xmystats_compte);

		XMY_prefSetString(str, liste);
		XMY_setPassword(regie, xmystats_compte['identifiant'], xmystats_compte['password']);

	}
}

// Editer un compte
function XMY_editCompte() {
	var regie = xmystats_regie;
	var str = 'comptes.' + regie + '.liste';

	var liste			= document.getElementById('xmystats-options-iframe').contentDocument.getElementById('xmystats-listbox');
	var selectedItem	= liste.selectedItem;

	if(selectedItem) {
	
		var identifiant = selectedItem.childNodes[1].getAttribute('label');
		var cpt = new Array();
		for(var i = 2; i < selectedItem.childNodes.length; i++) {
			cpt.push(selectedItem.childNodes[i].getAttribute('label'));
		}
		
		window.openDialog('chrome://xmystats/content/' + ( XMY_issetor('XMY_SuppFields_' + regie) != null ? 'regies/add-pages/' + regie + '.xul' : 'options/pages/add.xul' ), 'xmystats-resize-dialog', 'centerscreen,chrome,modal', 'edit', selectedItem.childNodes[0].getAttribute('label'), identifiant, XMY_getPassword(regie, identifiant), cpt);

		if (xmystats_compte != null) {
		
			var comptes = XMY_loadCompte(regie);
			var toSet = '';
			
			for (var a in comptes) {
				if (a != liste.selectedIndex) {
					toSet += XMY_concatCompte(comptes[a].slice(0, comptes[a].length - 1));
				} else {
					toSet += XMY_concatCompte(xmystats_compte);
					
					XMY_delPassword(regie, comptes[a][1]);
					XMY_setPassword(regie, xmystats_compte['identifiant'], xmystats_compte['password']);

					for(var i = selectedItem.childNodes.length - 1; i >= 0; i--) {
						selectedItem.removeChild(selectedItem.childNodes.item(i));
					}
					XMY_addLigneCompte(xmystats_compte, true);
				}
			}
			XMY_prefSetString(str, toSet);
			
		}
	}
}

// Supprimer un compte
function XMY_delCompte() {
	var regie = xmystats_regie;
	var str = 'comptes.' + regie;

	var liste			= document.getElementById('xmystats-options-iframe').contentDocument.getElementById('xmystats-listbox');
	var selectedItem	= liste.selectedItem;

	if(selectedItem && confirm('Etes-vous s\xFBr de vouloir supprimer ce compte ?')) {
		var comptes = XMY_loadCompte(regie);
		var toSet = '';
		for (var a in comptes) {
			if (a != liste.selectedIndex) {
				toSet += XMY_concatCompte(comptes[a].slice(0, comptes[a].length - 1));
			} else {
				XMY_delPassword(regie, comptes[a][1]);
			}
		}
		XMY_prefSetString(str + '.liste', toSet);
		liste.removeChild(selectedItem);
	}
}

// Valider l'ajout d'un compte
function XMY_saveAccount() {
	Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader).loadSubScript("chrome://xmystats/content/lib/array.js");
	
	var errors = '';
	window.opener.xmystats_compte = {};
	
	window.opener.xmystats_compte['libelle'] = document.getElementById('xmystats.add.libelle').value;
	if (!window.opener.xmystats_compte['libelle']) errors += 'Vous devez indiquer un libell\xE9.\n';
	
	window.opener.xmystats_compte['identifiant'] = document.getElementById('xmystats.add.identifiant').value;
	if (!window.opener.xmystats_compte['identifiant']) errors += 'Vous devez indiquer votre identifiant.\n';
	
	window.opener.xmystats_compte['password'] = document.getElementById('xmystats.add.password').value;
	if (!window.opener.xmystats_compte['password']) errors += 'Vous devez indiquer votre mot de passe.\n';
	
	var textboxes = document.getElementsByTagName('textbox');
	function XMY_saveAccount_filter(field) { return (!['libelle', 'identifiant', 'password'].inArray(field)); }
	for(var i=0; i<textboxes.length; i++) {
		var field = textboxes[i].id.substring('xmystats.add.'.length);
		if(!XMY_saveAccount_filter(field)) continue;
		window.opener.xmystats_compte[field] = textboxes[i].value;
		if(!window.opener.xmystats_compte[field]) errors += 'Vous devez remplir le champ "' + field + '".\n';
	}
	
	if(errors != '') alert(errors);
	
	return (errors == '');
}

// Annuler l'ajout d'un compte
function XMY_cancelAccount() {
	window.opener.xmystats_compte = null;
}

// Charger les options
function XMY_loadOptions() {
	var iframeDocument = document.getElementById('xmystats-options-iframe').contentDocument;
	iframeDocument.getElementById('xmystats-caption').label = xmystats_regie_libelle;
	
	var regie = xmystats_regie;
	if(regie == null) return;
	
	var comptes = XMY_loadCompte(regie, false);
	for (var a in comptes) {
		XMY_addLigneCompte(comptes[a].slice(0, comptes[a].length-1));
	}
	
	// site Web
	var siteWeb = XMY_issetor('XMY_SiteWeb_' + regie);
	if(siteWeb) {
		iframeDocument.getElementById('xmystats-visit-regie').setAttribute('oncommand', 'XMY_generateDocument("' + siteWeb + '")');
		iframeDocument.getElementById('xmystats-visit-regie').setAttribute('disabled', 'false');
	}
	
	// WMC
	var numWmc = XMY_issetor('XMY_Wmc_' + regie);
	if(numWmc) {
		iframeDocument.getElementById('xmystats-visit-wmc').setAttribute('oncommand', 'XMY_generateDocument("http://www.webmasterclub.fr/regies/regie,' + numWmc + '.html")');
		iframeDocument.getElementById('xmystats-visit-wmc').setAttribute('disabled', 'false');
	}
	
	// libellé de récupération des statistiques
	iframeDocument.getElementById('xmystats-recuperation-stats').value = 'R\xE9cup\xE9ration des statistiques : ' + XMY_issetor('XMY_RecupStats_' + regie, 'NON');
}

// Initialiser l'ajout d'un compte
function XMY_initAddCompte() {
	if (window.arguments[0] == 'edit')	{
		Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader).loadSubScript("chrome://xmystats/content/lib/array.js");
	
		document.getElementById('xmystats.add.libelle').value = window.arguments[1];
		document.getElementById('xmystats.add.identifiant').value = window.arguments[2];
		document.getElementById('xmystats.add.password').value = window.arguments[3];
		
		var j = 0;
		var textboxes = document.getElementsByTagName('textbox');
		function XMY_initAddCompte_filter(field) { return (!['libelle', 'identifiant', 'password'].inArray(field)); }
		for(var i = 0; i < textboxes.length; i++) {
			if(!XMY_initAddCompte_filter(textboxes[i].id.substring('xmystats.add.'.length))) continue;
			textboxes[i].value = window.arguments[4][j++];
		}		
		
	}
}

// Charger les préférences
function XMY_loadPreferences() {
	var radioButtons = new Array();
	radioButtons['a'] = '1';
	radioButtons['c'] = '1';
	
	var intInputs = new Array();
	intInputs['maxTimeOut'] = '15';
	intInputs['maxCacheTime'] = '30';
	
	var strInputs = new Array();
	strInputs['usdToEur'] = '';
	
	var pagedocument = document.getElementById('xmystats-preferences-iframe').contentDocument;
	
	for (var nom in radioButtons) {
		var val = XMY_prefGetString('pref-' + nom);
		if (val == null) {
			val = radioButtons[nom];
		} else {
			pagedocument.getElementById('XMYSTATS-pref-' + nom + '-' + radioButtons[nom]).setAttribute('selected', 'false');
		}
		pagedocument.getElementById('XMYSTATS-pref-' + nom + '-' + val).setAttribute('selected', 'true');
	}
	
	for(var nom in intInputs) {
		var val = XMY_prefGetInt('pref-' + nom);
		if(val == null) val = intInputs[nom];
		pagedocument.getElementById('XMYSTATS-pref-' + nom).value = val;
	}
	
	for(var nom in strInputs) {
		var val = XMY_prefGetString('pref-' + nom);
		if(val == null) val = strInputs[nom];
		pagedocument.getElementById('XMYSTATS-pref-' + nom).value = val;
	}
}