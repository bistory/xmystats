var xmystats_news_loaded = false;

function XMY_initWeb() {
	var webid = XMY_prefGetString('web.id');
	var webkey = XMY_prefGetString('web.key');
	
	var data = (webid && webkey ? 'id=' + webid + '&k=' + webkey : null);
	XMY_req_xml('GET', 'http://www.xmystats.com/news/idweb.php', data, XMY_parseIdWeb);
}

function XMY_parseIdWeb(xml) {
	var id	= xml.childNodes[0].childNodes[0].nodeValue;
	var key	= xml.childNodes[1].childNodes[0].nodeValue;
	
	XMY_prefSetString('web.id', id);
	XMY_prefSetString('web.key', key);

	xmystats_idweb = id;
	
	XMY_loadNews();
}

function XMY_loadNews() {
	if (!xmystats_news_loaded) {
		XMY_newsSelected();
		XMY_req_xml('GET', 'http://www.xmystats.com/news/', 'v=' + xmystats_version + '&id=' + xmystats_partenaire_id + '&idweb=' + xmystats_idweb + '&kweb=' + XMY_prefGetString('web.key') + '&ps=' + (xmystats_pub_shown ? 1 : 0), XMY_parseNews);
		xmystats_news_loaded = true;
	}
	setTimeout('XMY_loadNews()', 1000*60*5);
}

function XMY_createNewsElements(elt, id) {
	var tool = document.createElement(elt.nodeName);
	if (typeof id != 'undefined') {
		tool.setAttribute('id', 'XMYSTATS-NewsId-' + id);
	}

	for (var a in elt.attributes) {
		if (elt.attributes[a].nodeType == 2) {
			tool.setAttribute(elt.attributes[a].nodeName, elt.attributes[a].nodeValue);
		}
	}

	for (var a in elt.childNodes) {
		if (elt.childNodes[a].nodeType == 1) {
			tool.appendChild(XMY_createNewsElements(elt.childNodes[a]));
		}
	}

	return tool;
}

function XMY_parseNews(xml) {
	var webbox			= document.getElementById('XMYSTATS-WebBox');
	var xmystats_news_everSep = false;

	while (webbox.childNodes.length) {
		webbox.removeChild(webbox.childNodes[0]);
	}

	var params = { forcepub: 0 };
	for (var a in xml.attributes) {
		if (xml.attributes[a].nodeType == 2) {
			eval('params.' + xml.attributes[a].nodeName + ' = "' + xml.attributes[a].nodeValue + '";');
		}
	}

	var b = 0;
	for (var a in xml.childNodes) {
		if (xml.childNodes[a].nodeType == 1) {
			if (!xmystats_news_everSep) {
				webbox.appendChild(document.createElement('toolbarseparator'));
				xmystats_news_everSep = true;
			}
			webbox.appendChild(XMY_createNewsElements(xml.childNodes[a], b++));
		}
	}

	var withpub = document.getElementById('xmystats-pubBloc');
	if (withpub) {
		var fermer = document.createElement('toolbarbutton');
		fermer.setAttribute('image', "chrome://xmystats/skin/pics/close.png");
		fermer.setAttribute('onclick', "XMY_clearPartenaire()");
		fermer.setAttribute('id', "XMYSTATS-Button-Clear-Pub");
		withpub.parentNode.insertBefore(fermer, withpub.nextSibling);
	}

	if (params.forcepub == '1' && !xmystats_pub_shown) {
		XMY_clearPartenaire();
	}
	
	xmystats_pub_shown = !xmystats_pub_shown;
	XMY_clearPartenaire();
}

var xmystats_pub_shown = (XMY_prefGetInt('pub.shown') != 0);
	
var xmystats_news_selected = false;
function XMY_newsSelected() {
	if (!xmystats_news_selected) {
		a = XMY_prefGetString('news.possibilities');
		var set = '';
		if (a == null) {
			set = xmystats_partenaire_id;
		} else {
			a = a.split(',');
			var found = false;
			for (var b in a) {
				if (a[b] != '') {
					set += a[b] + ',';
					if (a[b] == xmystats_partenaire_id) {
						found = true;
					}
				}
			}
			if (!found) {
				set += xmystats_partenaire_id;
			}
		}
		XMY_prefSetString('news.possibilities', set);
		var a = XMY_prefGetString('news.selected');
		if (a == null) {
			XMY_prefSetString('news.selected', xmystats_partenaire_id);
		} else {
			xmystats_partenaire_id = a;
		}
		xmystats_news_selected = true;
	}
}

function XMY_clearPartenaire() {
	var partenaire = document.getElementById('xmystats-pubBloc');
	if (partenaire) {
		if (xmystats_pub_shown) {		// TODO
			partenaire.setAttribute('style', 'display: none');
			document.getElementById('XMYSTATS-Button-Clear-Pub').setAttribute('image', 'chrome://xmystats/skin/pics/open.png');
		} else {
			partenaire.setAttribute('style', 'display: ""');
			document.getElementById('XMYSTATS-Button-Clear-Pub').setAttribute('image', 'chrome://xmystats/skin/pics/close.png');
		}
	}
	xmystats_pub_shown = !xmystats_pub_shown;
	XMY_prefSetInt('pub.shown', xmystats_pub_shown ? 1 : 0);
}