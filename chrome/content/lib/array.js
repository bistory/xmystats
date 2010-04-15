if(!Array.prototype.inArray) {
	Array.prototype.inArray = function(value) {
		for (var i in this) if (this[i] === value) return true;
		return false;
	};
}