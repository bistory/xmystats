// Tests => si positionnement à true, la mise en cache ne se fait pas
var XMY_DebugStats = false;


// Gestion des files d'attente pour les régies
var XMY_progress_todo	= 0;
var XMY_progress_done	= 0;
var XMY_queue			= new Array();
var XMY_queue_progress	= new Array();


// Définition d'un nombre
//var XMY_montant = '[0-9][0-9,.\' ]*[.,][0-9]{2}';
//var XMY_montant = '(?:0|[1-9]{1,3}(?:[,.\' ][0-9]{3})*|[1-9][0-9]*)(?:|[.,][0-9]{2})';
var XMY_montant = '(?:0|[1-9]{1,3}(?:[,. \\\'][0-9]{3})*|[1-9][0-9]*)[.,][0-9]{2}';



// Initialiser les statistiques pour toutes les régies
function XMY_initStats() {
	var isForStatsAll = false;
	for (var a in xmystats_regies) {
		var isForStats = ( XMY_issetor('XMY_RecupStats_' + xmystats_regies[a]['court'], 'NON') != 'NON' && XMY_issetor('XMY_NbStats_' + xmystats_regies[a]['court'], 0) > 0 && XMY_loadCompte(xmystats_regies[a]['court'], true, false).length > 0 );
		isForStatsAll = isForStatsAll || isForStats;
		if(isForStats) {
			XMY_initStatsRegie(a);
		}
	}
	if(!isForStatsAll) {
		alert("Vous n'avez aucune r\xE9gie permettant la r\xE9cup\xE9ration des statistiques.");
		XMY_updateProgress(0);
	} else {
		XMY_beginStats();
	}
}

// Initialiser les statistiques pour une régie
function XMY_initStatsRegie(idRegie) {
	var regie	= xmystats_regies[idRegie]['court'];
	var rows	= document.getElementById('xmystats-stats-rows');

	var comptes = XMY_loadCompte(regie, true, false);
	if (comptes.length > 0) {
		var row	= document.createElement('row');
		row.setAttribute('class', 'regie');
		
		var label = document.createElement('label');
		label.setAttribute('value', xmystats_regies[idRegie]['long']);
		row.appendChild(label);

		// jour
		var label = document.createElement('label');
		label.setAttribute('value', '-');
		label.setAttribute('class', 'number');
		label.setAttribute('id', 'xmystats-stat-' + regie + '-jour');
		row.appendChild(label);

		// J-1
		var label = document.createElement('label');
		label.setAttribute('value', '-');
		label.setAttribute('class', 'numberP');
		label.setAttribute('id', 'xmystats-stat-' + regie + '-j-1');
		row.appendChild(label);

		// mois
		var label = document.createElement('label');
		label.setAttribute('value', '-');
		label.setAttribute('class', 'number');
		label.setAttribute('id', 'xmystats-stat-' + regie + '-mois');
		row.appendChild(label);

		// M-1
		var label = document.createElement('label');
		label.setAttribute('value', '-');
		label.setAttribute('class', 'numberP');
		label.setAttribute('id', 'xmystats-stat-' + regie + '-m-1');
		row.appendChild(label);

		// total
		var label = document.createElement('label');
		label.setAttribute('value', '-');
		label.setAttribute('class', 'number');
		label.setAttribute('id', 'xmystats-stat-' + regie + '-total');
		row.appendChild(label);
				
		// euro ou autre monnaie ?
		var money = XMY_issetor('XMY_Money_' + regie, 'euro');
		var vbox = document.createElement('vbox');
		vbox.setAttribute('pack', 'center');
		vbox.setAttribute('align', 'center');		
		var image = document.createElement('image');
		image.setAttribute('src', 'chrome://xmystats/skin/pics/money_' + money + '.png');
		vbox.appendChild(image);		
		row.appendChild(vbox);

		rows.appendChild(row);
		
		// Ajout des comptes
		for (var a in comptes) {
			var cpt = comptes[a];
			var other = XMY_buildOther(cpt);
			
			if(!document.getElementById('xmystats-stat-' + regie + '-row-' + cpt[1] + '-' + other)) {
				var row = document.createElement('row');
				row.setAttribute('id', 'xmystats-stat-' + regie + '-row-' + cpt[1] + '-' + other);
				
				var label = document.createElement('label');
				label.setAttribute('value', '     ' + cpt[0]);
				row.appendChild(label);
	
				// Jour
				var label = document.createElement('label');
				label.setAttribute('value', '-');
				label.setAttribute('class', 'number');
				label.setAttribute('id', 'xmystats-stat-' + regie + '-jour-' + cpt[1] + '-' + other);
				row.appendChild(label);
	
				// J-1
				var label = document.createElement('label');
				label.setAttribute('value', '-');
				label.setAttribute('class', 'numberP');
				label.setAttribute('id', 'xmystats-stat-' + regie + '-j-1-' + cpt[1] + '-' + other);
				row.appendChild(label);
			
				// Mois
				var label = document.createElement('label');
				label.setAttribute('value', '-');
				label.setAttribute('class', 'number');
				label.setAttribute('id', 'xmystats-stat-' + regie + '-mois-' + cpt[1] + '-' + other);
				row.appendChild(label);
	
				// M-1
				var label = document.createElement('label');
				label.setAttribute('value', '-');
				label.setAttribute('class', 'numberP');
				label.setAttribute('id', 'xmystats-stat-' + regie + '-m-1-' + cpt[1] + '-' + other);
				row.appendChild(label);
			
				// Total
				var label = document.createElement('label');
				label.setAttribute('value', '-');
				label.setAttribute('class', 'number');
				label.setAttribute('id', 'xmystats-stat-' + regie + '-total-' + cpt[1] + '-' + other);
				row.appendChild(label);
				
				rows.appendChild(row);
				
				XMY_progress_todo += XMY_issetor('XMY_NbStats_' + regie, 0);
				XMY_queue.push({ 'regie': regie, 'compte': cpt[1], 'other': other });
			}
		}
	}
}

function XMY_buildOther(cpt) {
	return cpt.slice(2, cpt.length - 1).join(xmystats_separator2);
}

// Mettre à jour les éléments de progression (barre, intitulé, image)
function XMY_updateProgress(inc) {
	if(isNaN(inc)) inc = 1;
	XMY_progress_done += inc;
	
	document.getElementById('xmystats-progress').setAttribute('value', XMY_progress_todo > 0 ? 100 * XMY_progress_done / XMY_progress_todo : 100);
	if(XMY_progress_done >= XMY_progress_todo) {
		document.getElementById('xmystats-label-loading').setAttribute('label', 'Chargement termin\xE9 !');
		document.getElementById('xmystats-image-loading').setAttribute('class', 'loaded');
		
		var minutes = XMY_prefGetInt('pref-maxCacheTime');
		if(minutes == null) {
			minutes = 30;
		}
		window.setTimeout('window.location.reload()', minutes * 60 * 1000);
	} else {
		document.getElementById('xmystats-label-loading').setAttribute('label', 'Chargement en cours ...');
		document.getElementById('xmystats-image-loading').setAttribute('class', 'loading');		
	}
}

function XMY_getCurrentValue(idLabel) {
	return document.getElementById(idLabel).getAttribute('value');
}

// Mettre à jour une section d'un compte d'une régie
function XMY_updateCompte(value, section, regie, compte, other) {
	XMY_updateLabel(value, 'xmystats-stat-' + regie + '-' + section + '-' + compte + '-' + other, true);
	XMY_updateLabel(value, 'xmystats-stat-' + regie + '-' + section);
	XMY_updateLabel(value, 'xmystats-stat-' + section);
}

// Mettre à jour un label
function XMY_updateLabel(value, idLabel, canBeNok) {
	var label = document.getElementById(idLabel);
	var currentValue = XMY_getCurrentValue(idLabel);
	
	if( (isNaN(value) || value == null)) {
		if(value != '-' && canBeNok && currentValue == '-') {
			label.setAttribute('value', 'nok');
			label.setAttribute('style', 'font-style: italic;');
		}
	} else {
		label.setAttribute('value', XMY_formatMontant(XMY_cleanNumber(currentValue) + parseFloat(value)));
		label.setAttribute('style', 'font-style: normal;');
	}
}


// Commencer le traitement des statistiques
function XMY_beginStats() {
	var element;
	var cache;
	
	while(XMY_queue.length > 0) {
		element = XMY_queue.shift();
		if(!XMY_issetor('XMY_DebugStats_' + element['regie'], false) && !XMY_DebugStats) {
			cache = XMY_getFromCache(element['regie'] + '-' + element['compte'] + '-' + element['other']);
		}
		if(cache == null) {
			if(!XMY_queue_progress[element['regie']]) {
				XMY_queue_progress[element['regie']] = new Array();
				eval('XMY_getStats_' + element['regie'] + '("' + element['compte'] + '", "' + element['other'] + '");');
			} else {
				XMY_queue_progress[element['regie']].unshift(element);
			}
		} else {
			// Affichage des chiffres
			for(var a in cache) {
				XMY_updateCompte( (cache[a] != '-' ? XMY_cleanNumber(cache[a]) : '-'), a, element['regie'], element['compte'], element['other']);
			}
			
			// Affichage de la date de mise à jour
			XMY_displayTime(element['regie'], element['compte'], element['other']);
			
			XMY_updateProgress(XMY_issetor('XMY_NbStats_' + element['regie'], 0));
			cache = null;
		}
	}
}

// Afficher l'heure du cache d'un compte
function XMY_displayTime(regie, compte, other) {
	var d = new Date();
	d.setTime(XMY_getTimeFromCache(regie + '-' + compte + '-' + other));
	
	var hours = d.getHours().toString();
	if(hours.length == 1) hours = '0' + hours;
	var minutes = d.getMinutes().toString();
	if(minutes.length == 1) minutes = '0' + minutes;
	var seconds = d.getSeconds().toString();
	if(seconds.length == 1) seconds = '0' + seconds;
	
	var label = document.createElement('label');
	label.setAttribute('value', hours + ':' + minutes + ':' + seconds);
	document.getElementById('xmystats-stat-' + regie + '-row-' + compte + '-' + other).appendChild(label);	
}

// Enregistrer les statistiques pour le compte d'une régie
function XMY_recordStats(regie, compte, other) {
	var sections = new Array('jour', 'j-1', 'mois', 'm-1', 'total');
	var id = regie + '-' + compte + '-' + other;
	var toCache = new Object();
	for(var i = 0; i < sections.length; i++) {
		toCache[sections[i]] = document.getElementById('xmystats-stat-' + regie + '-' + sections[i] + '-' + compte + '-' + other).getAttribute('value');
	}
	if(!XMY_issetor('XMY_DebugStats_' + regie, false) && !XMY_DebugStats) {
		XMY_setToCache(id, toCache);
		XMY_displayTime(regie, compte, other);
	}
	// Si l'on a un suivant, on l'exécute.
	if(XMY_queue_progress[regie].length > 0) {
		var element = XMY_queue_progress[regie].shift();
		eval('XMY_getStats_' + element['regie'] + '("' + element['compte'] + '", "' + element['other'] + '");');		
	}
}



// Récupérer une valeur particulière sur une page pour les statistiques - mode asynchrone
function XMY_req_extractStats(section, next, regie, compte, other, url, regexp, dontreload, mode, data, referer, codeBefore, codeAfter, coefficient, repeat) {
	if(!other) other = '';
	if(!dontreload) dontreload = false;
	if(!mode) mode = 'GET';
	mode = mode.toUpperCase();
	if(!data) data = null;
	if(!referer) referer = null;
	if(!codeBefore) codeBefore = null;
	if(!codeAfter) codeAfter = null;
	if(!coefficient) coefficient = 1;
	if(!repeat) repeat = false;

	var separator = '[#XMYSEP#]';
	var key = mode + separator + url + separator + data;
	var isAborted = false;
	
	if(mode == 'GET') {
		url = url + (data ? '?' + data : '');
		data = null;
	}
	
	if(url != null && (dontreload != true || !XMY_req_extract_memo[key])) {
	
		var timer = XMY_prefGetInt('pref-maxTimeOut');
		if(timer == null) timer = 15;
	
		var myHttpRequest = new XMLHttpRequest();

		myHttpRequest.open(mode, url, true);
		
		myHttpRequest.onreadystatechange = function() {
			if(myHttpRequest.readyState == 4) {
				if(!isAborted) {
					clearTimeout(timeOut);
					if(myHttpRequest.status == 200) {
						XMY_req_extract_memo[key] = myHttpRequest.responseText;
					} else {
						XMY_req_extract_memo[key] = null;
					}
				} else {
					XMY_req_extract_memo[key] = null;
				}
				XMY_req_extractStats_applyRegExp(section, next, regie, compte, other, key, regexp, codeBefore, codeAfter, coefficient, repeat);
			}
		}

		if(mode == 'POST') {
			myHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			myHttpRequest.setRequestHeader('Content-Length', (data != null ? data.length : 0));
		}
		if (referer != null) {
			myHttpRequest.setRequestHeader('Referer', referer);
		}

		myHttpRequest.send(data);
	
		var timeOut = window.setTimeout(function() { isAborted = true; myHttpRequest.abort(); }, timer * 1000);
	} else {
		XMY_req_extractStats_applyRegExp(section, next, regie, compte, other, key, regexp, codeBefore, codeAfter, coefficient, repeat);
	}
}

// Appliquer une expression régulière pour l'extraction de statistiques
function XMY_req_extractStats_applyRegExp(section, next, regie, compte, other, key, regexp, codeBefore, codeAfter, coefficient, repeat) {
	if(coefficient == null) coefficient = 1;
	
	if(section != null && regie != null && compte != null) {
		var temp = XMY_applyRegExp(XMY_req_extract_memo[key], regexp, codeBefore, codeAfter);
		if(temp != null && !repeat) temp = XMY_cleanNumber(temp) * coefficient;
		XMY_updateCompte(temp, section, regie, compte, other);
		
		if(repeat && temp != null) {
			var codeTemp = XMY_applyRegExp_getAll(XMY_req_extract_memo[key], regexp, codeBefore, codeAfter);
			return XMY_req_extractStats_applyRegExp(section, next, regie, compte, other, key, regexp, XMY_req_extract_memo[key].substring(0, codeTemp.length + XMY_req_extract_memo[key].indexOf(codeTemp, (codeBefore != null ? (XMY_req_extract_memo[key].indexOf(codeBefore) + codeBefore.length) : 0))), codeAfter, coefficient, repeat);
		} else if(repeat) {
			XMY_updateCompte((coefficient - 1) * XMY_cleanNumber(XMY_getCurrentValue('xmystats-stat-' + regie + '-' + section + '-' + compte + '-' + other)) , section, regie, compte, other);
		}
		
		XMY_updateProgress();
	}
	
	if(next != null) {
		eval('XMY_getStats_' + regie + '_' + next + '("' + compte + '", "' + other + '");');
	} else {
		XMY_recordStats(regie, compte, other);
	}
	
	return true;
}