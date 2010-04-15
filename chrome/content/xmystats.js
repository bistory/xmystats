xmystats_version = '0.4.2';

window.addEventListener('load', XMY_init, true);

// Initialiser la barre
var xmystats_init_done = false;
function XMY_init() {
	if (xmystats_init_done) {
		return false;
	}
	
	if(window.document.getElementById("content")) {
		if (document.getElementById('XMMYSTATS-separator-news')) {
			var sep = document.getElementById('XMMYSTATS-separator-news');
		} else {
			var sep	= document.getElementById('XMYSTATS-WebBox');
		}
			
		var doc	= document.getElementById('XMYSTATS-Toolbar');
		var toolbb = null;
		var menupp = null;
		var affichePhrase = true;
		var xmystats_everBuild = new Array();
		
		// on rajoute les régies
		for (var a in xmystats_regies) {
			if (document.getElementById('XMYSTATS-MainMenu-' + xmystats_regies[a]['court'])) {
				doc.removeChild(document.getElementById('XMYSTATS-MainMenu-' + xmystats_regies[a]['court']));
				xmystats_everBuild[a] = false;
			}
			if (XMY_loadCompte(xmystats_regies[a]['court'], true, true).length > 0) {
				affichePhrase = false;
				
				toolbb = document.createElement('toolbarbutton');
				toolbb.setAttribute('id', 'XMYSTATS-MainMenu-' + xmystats_regies[a]['court']);
				if (XMY_prefGetString('pref-c') != '2') {
					toolbb.setAttribute('style', 'list-style-image: url("chrome://xmystats/skin/pics/regies/' + xmystats_regies[a]['court'] + '.png");');
				}
				toolbb.setAttribute('type', 'menu');
				toolbb.setAttribute('tooltiptext', 'Connexion aux comptes ' + xmystats_regies[a]['long']);
				if (XMY_prefGetString('pref-c') != '3') {
					toolbb.setAttribute('label', xmystats_regies[a]['long'] + ' ');
				}
				
				menupp = document.createElement('menupopup');
				menupp.setAttribute('id', 'XMYSTATS-Menu-' + xmystats_regies[a]['court']);
				toolbb.appendChild(menupp);
				
				doc.insertBefore(toolbb, sep);
				
				xmystats_everBuild[a] = true;

				XMY_makeMenu(xmystats_regies[a]['court']);
			}
		}
		
		if (affichePhrase) {
			if (!document.getElementById('XMYSTATS-PHRASEAJOUTCOMPTE')) {
				toolbb = document.createElement('toolbarbutton');
				toolbb.setAttribute('id', 'XMYSTATS-PHRASEAJOUTCOMPTE');
				toolbb.setAttribute('label', 'Cliquez sur le bouton "Configuration ..." pour ajouter vos comptes');
				doc.insertBefore(toolbb, sep);
			}
		} else if (document.getElementById('XMYSTATS-PHRASEAJOUTCOMPTE')) {
				document.getElementById('XMYSTATS-Toolbar').removeChild(document.getElementById('XMYSTATS-PHRASEAJOUTCOMPTE'));
		}

		XMY_initWeb();
		xmystats_init_done = true;
	}
}


// Construire le menu d'une régie
function XMY_makeMenu(regie) {
	var comptes = XMY_loadCompte(regie, true, false);
	var menu = document.getElementById('XMYSTATS-Menu-' + regie);
	for(var i=menu.childNodes.length-1; i>=0; i--) {
		menu.removeChild(menu.childNodes.item(i));
	}
	for (var a in comptes) {
		var tempItem = document.createElement("menuitem");
		tempItem.setAttribute("label", comptes[a][0]);
		tempItem.setAttribute("oncommand", "XMY_login('" + regie + "', '" + comptes[a].slice(1, comptes[a].length-1).join(xmystats_separator2) + "');");
		menu.appendChild(tempItem);
	}
}

// Se logguer sur une régie
function XMY_login(regie, login) {
	var formulaire = XMY_param(regie, login);
	
	var generatedDocument = XMY_generateDocument();
	generatedDocument.title = 'Chargement en cours ...';
	
	var myForm = generatedDocument.createElement('form');
	for(var a in formulaire['form']) {
		myForm.setAttribute(a, formulaire['form'][a]);
	}

	for(var a in formulaire['input']) {
		var myElement = generatedDocument.createElement('input');
		myElement.setAttribute('type', 'hidden');
		myElement.setAttribute('name', a);
		myElement.setAttribute('value', formulaire['input'][a]);
		myForm.appendChild(myElement);
	}

	generatedDocument.body.appendChild(myForm);
	myForm.submit();
}

// Ouvrir les préférences et recharger l'init
function XMY_openOptions() {
	window.openDialog("chrome://xmystats/content/options/options.xul", "xmystats-options-dialog", "centerscreen,chrome,modal,resizable");
	xmystats_init_done = false;
	XMY_init();
}

// Ouvrir les statistiques générales
function XMY_openStats() {
	if (document.getElementById('XMYSTATS-PHRASEAJOUTCOMPTE')) {
		alert("Vous devez d'abord enregistrer vos comptes en cliquant sur \"Configuration ...\"");
	} else {
		var generatedDocument = XMY_generateDocument("chrome://xmystats/content/stats/stats.xul");
	}
}