var Currencies = {

	currencyRates: new Array(),
	
	/* Conversion ratio from `currency` to euro */
	getConversionRatio: function(currency) {
		currency = currency.toUpperCase();

		var curToEurFromPref = XMY_prefGetString('pref-' + currency.toLowerCase() + 'ToEur');
		if(curToEurFromPref != '') {
			return parseFloat(curToEurFromPref);
		}
		
		if(this.currencyRates[currency]) return this.currencyRates[currency];

		var usdToCur = this._getConversionRatioForUsd(currency);
		var usdToEur = currency == 'USD' ? this._getConversionRatioForUsd('EUR') : this.getConversionRatio('USD');
		
		var curToEur = parseFloat(usdToEur / usdToCur);
		this._setConversionRatio(currency, curToEur);
		return curToEur;		
	},
	
	_getConversionRatioForUsd: function(currency) {
		currency = currency.toUpperCase();
		
		if(currency == 'USD') return 1;
		else return parseFloat(XMY_req_extract('http://www.boursorama.com/devises/toutes_devises_usd.phtml', '<td align="center"><b>([0-9.]+)</b></td>', true, 'GET', null, null, '<td align="center"><b>' + currency + '</b></td>'));
	},
	
	_setConversionRatio: function(currency, value) {
		this.currencyRates[currency] = parseFloat(value);
	}
	
};