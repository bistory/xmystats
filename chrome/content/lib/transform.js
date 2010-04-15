// Obtenir la valeur associée à la variable "name" si elle existe, et sinon la valeur par défaut
function XMY_issetor(name, defValue) {
	/*return ( typeof(window[name]) != 'undefined' ? window[name] : defValue );*/

	var ev = null;
	try { ev = eval(name); } catch(e) {}
	return (typeof(ev) != 'undefined' && ev != null ? ev : defValue);
}

// Construire le tableau complet des paramètres pour une régie donnée
function XMY_param(regie, login) {
	eval('var res = XMY_param_' + regie + '("' + login + '");');
	res['params'] = XMY_buildParams(res['input']);
	
	return res;
}

// Construire le tableau des paramètres
function XMY_buildParams(inputs) {
	var params = new Array();
	for(var a in inputs) {
		params.push(a + '=' + XMY_URLEncode(inputs[a]));
	}
	return params.join('&');
}

// Remplacer un caractère par un autre
function XMY_replace(str, before, after, noregex) {
	if(noregex) {
		return (str != null ? str.toString().split(before).join(after) : null);
	} else {
		return (str != null ? str.toString().replace(new RegExp(before, 'g'), after) : null);
	}
}

// Nettoyer une chaîne de caractères
function XMY_cleanString(value) {
	value = value.toString();
	value = XMY_replace(value, '&nbsp;', ' ');
	value = XMY_replace(value, '&thinsp;', ' ');
	value = XMY_replace(value, '&#160;', ' ');
	value = XMY_replace(value, '\xA0', ' ');
	value = XMY_replace(value, '\n', '');
	value = XMY_replace(value, '\r', '');
	return value;
}

// Nettoyer une valeur numérique
function XMY_cleanNumber(value) {
	value = value.toString();
	if(value == '-' || value == 'nok') return 0;
		
	value = XMY_replace(value, ',', '.');
	
	var neg = (value.charAt(0) == '-');
	
	var lastPoint = value.lastIndexOf('.');
	if(lastPoint >= 0) {
		value = XMY_replace(value.substring(0, lastPoint), '[^0-9]', '') + '.' + XMY_replace(value.substring(lastPoint+1), '[^0-9]', '');
	}
	
	value = parseFloat( (neg ? '-' : '') + value );
	return (isNaN(value) ? 'nok' : value);
}

// Appliquer une expression régulière sur un texte
function XMY_applyRegExp(text, regexp, codeBefore, codeAfter) {
	text = text != null && regexp != null ? text : '';

	text = XMY_cleanString(text);
	
	if(codeBefore != null) {
		var indexOf = text.indexOf(codeBefore);
		text = indexOf > -1 ? text.substring(indexOf + codeBefore.length) : '';
	}
	if(codeAfter != null) {
		var lastIndexOf = text.lastIndexOf(codeAfter);
		text = lastIndexOf > -1 ? text.substring(0, lastIndexOf) : '';
	}
	
	var myRegExp = new RegExp(regexp);
	return myRegExp.test(text) ? myRegExp.exec(text)[1] : null;
}


// Obtenir l'intégralité de ce qui est capturé par l'expression régulière
function XMY_applyRegExp_getAll(text, regexp, codeBefore, codeAfter) {
	text = text != null && regexp != null ? text : '';

	text = XMY_cleanString(text);
	
	if(codeBefore != null) {
		var indexOf = text.indexOf(codeBefore);
		text = indexOf > -1 ? text.substring(indexOf + codeBefore.length) : '';
	}
	if(codeAfter != null) {
		var lastIndexOf = text.lastIndexOf(codeAfter);
		text = lastIndexOf > -1 ? text.substring(0, lastIndexOf) : '';
	}
	
	var myRegExp = new RegExp(regexp);
	text = myRegExp.test(text) ? myRegExp.exec(text)[0] : '';
	
	return text != '' ? text : null;
}


// Obtenir une date formatée
function XMY_getDate(type, lang) {
	
	var myFormat = new Array();
	switch(lang) {
		case 'fr':
			myFormat['day'] = '%d/%m/%Y';
			myFormat['month'] = '%m/%Y';
			break;
		case 'fr2':
			myFormat['day'] = '%d/%m/%y';
			myFormat['month'] = '%m/%y';
			break;
		case 'fr.':
			myFormat['day'] = '%d.%m.%Y';
			myFormat['month'] = '%m.%Y';
			break;
		case 'us':
			myFormat['day'] = '%Y-%m-%d';
			myFormat['month'] = '%Y-%m';
			break;
		case 'uk':
			myFormat['day'] = '%m/%d/%Y';
			myFormat['month'] = '%m/%Y';
			break;
		case 'wo':
			myFormat['day'] = '%Y%m%d';
			myFormat['month'] = '%Y%m';
			break;
	}
	
	var myDate = new Date();
	var myFormatedDate;
	
	switch(type) {
		case 'j-1':
			myDate.setDate(myDate.getDate() - 1);
			break;
		case 'm-1':
			myDate.setMonth(myDate.getMonth() - 1);
			break;
		case 'last-mois':
			myDate.setDate(1);
			myDate.setMonth(myDate.getMonth() + 1);
			myDate.setDate(myDate.getDate() - 1);
			break;
		case 'last-m-1':
			myDate.setDate(0);
			break;
	}
	
	var day = myDate.getDate().toString();
	if(day.length == 1) day = '0' + day;
	var month = (myDate.getMonth() + 1).toString();
	if(month.length == 1) month = '0' + month;
	var fullYear = myDate.getFullYear().toString();
	var year = fullYear.substr(2);
	
	switch(type) {
		case 'jour':
		case 'j-1':
		case 'last-mois':
		case 'last-m-1':
			myFormatedDate = myFormat['day'].replace('%d', day).replace('%m', month).replace('%Y', fullYear).replace('%y', year);
			break;
		case 'mois':
		case 'm-1':
			myFormatedDate = myFormat['month'].replace('%m', month).replace('%Y', fullYear).replace('%y', year);
			break;
		default:
			myFormatedDate = null;
			break;
	}
	
	return myFormatedDate;
}

// Formater en un montant
function XMY_formatMontant(value) {
	return isNaN(value) ? '-' : XMY_number_format(value, 2, '.', ' ');
}

// Formater un nombre
function XMY_number_format(number, laenge, sep, th_sep) {
  number = Math.round( number * Math.pow(10, laenge) ) / Math.pow(10, laenge);
  var arr_int = number.toString().split(".");
  if(!arr_int[0]) arr_int[0] = "0";
  if(!arr_int[1]) arr_int[1] = "";
  if(arr_int[1].length < laenge) {
    var nachkomma = arr_int[1];
    for(var i=arr_int[1].length+1; i <= laenge; i++){  nachkomma += "0";  }
    arr_int[1] = nachkomma;
  }
  if(th_sep != "" && arr_int[0].length > 3) {
    var Begriff = arr_int[0];
    arr_int[0] = "";
    for(var j = 3; j < Begriff.length ; j+=3) {
      arr_int[0] = th_sep + Begriff.slice(Begriff.length - j, Begriff.length - j + 3) +  arr_int[0];
    }
    arr_int[0] = Begriff.substr(0, (Begriff.length % 3 == 0)?3:(Begriff.length % 3)) + arr_int[0];
  }
  return arr_int[0]+sep+arr_int[1];
}

// URLEncode
function XMY_URLEncode(plaintext) {
	if(plaintext == null) return null;

	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
	    if (ch == " ") {
		    encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
		    encoded += ch;
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
			    /*
			    Unicode Character cannot be encoded using standard URL encoding.
			  	A space (+) will be substituted.
			  	*/
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	} // for

	return encoded;
}