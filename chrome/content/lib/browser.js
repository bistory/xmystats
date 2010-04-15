// Générer une page (nouveau document)
function XMY_generateDocument(url) {
	var mainWindow = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
	
	if(!url || url == '') url = 'about:blank';
	
	if (XMY_prefGetString('pref-a') == '2') {
		mainWindow.gBrowser.selectedBrowser.contentDocument.location = url;
	} else {
		mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab(url);
	}
	
	return gBrowser.selectedBrowser.contentDocument;
}

// Ajouter un onglet
function XMY_loadTab(url) {
	return XMY_generateDocument(url);
}