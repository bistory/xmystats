// Inclusion des régies admises
var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);

// 0-9
loader.loadSubScript("chrome://xmystats/content/regies/128b.js");
loader.loadSubScript("chrome://xmystats/content/regies/1staffiliation.js");	// TODO : test log

// A
loader.loadSubScript("chrome://xmystats/content/regies/adverline.js");		// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/adverstream.js");	// TODO : ajout stats
loader.loadSubScript("chrome://xmystats/content/regies/affilinet.js");
loader.loadSubScript("chrome://xmystats/content/regies/allopass.js");

// C
loader.loadSubScript("chrome://xmystats/content/regies/clickintext.js");
loader.loadSubScript("chrome://xmystats/content/regies/cmarketing.js");		// TODO : ajout log
loader.loadSubScript("chrome://xmystats/content/regies/comtrack.js");		// TODO : test log + test stats
loader.loadSubScript("chrome://xmystats/content/regies/cj.js");

// D
loader.loadSubScript("chrome://xmystats/content/regies/dualoptin.js");		// TODO : test log

// E
loader.loadSubScript("chrome://xmystats/content/regies/effiliation.js");	// TODO : ajout stats

// F
loader.loadSubScript("chrome://xmystats/content/regies/firstcoffee.js");

// G
loader.loadSubScript("chrome://xmystats/content/regies/gestionpub.js");		// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/adsense.js");

// I
loader.loadSubScript("chrome://xmystats/content/regies/ibase.js");			// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/idregie.js");		// TODO : ajout stats

// M
loader.loadSubScript("chrome://xmystats/content/regies/magikbiz.js");
loader.loadSubScript("chrome://xmystats/content/regies/miva.js");			// TODO : ajout stats
loader.loadSubScript("chrome://xmystats/content/regies/mixad.js");			// TODO : test log

// N
loader.loadSubScript("chrome://xmystats/content/regies/netaffiliation.js");

// P
loader.loadSubScript("chrome://xmystats/content/regies/paypal.js");
loader.loadSubScript("chrome://xmystats/content/regies/promobenef.js");
loader.loadSubScript("chrome://xmystats/content/regies/publicidees.js");

// R
loader.loadSubScript("chrome://xmystats/content/regies/reactivpub.js");
loader.loadSubScript("chrome://xmystats/content/regies/realmedia.js");		// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/rentabiliweb.js");	// TODO : ajout stats
loader.loadSubScript("chrome://xmystats/content/regies/rentadial.js");		// TODO : test log

// T
loader.loadSubScript("chrome://xmystats/content/regies/ticketsurf.js");		// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/tradedoubler.js");

// V
//loader.loadSubScript("chrome://xmystats/content/regies/valueclick.js");		// TODO : test log

// W
loader.loadSubScript("chrome://xmystats/content/regies/webgains.js");		// TODO : test log
loader.loadSubScript("chrome://xmystats/content/regies/wipub.js");

// Z
loader.loadSubScript("chrome://xmystats/content/regies/zanox.js");