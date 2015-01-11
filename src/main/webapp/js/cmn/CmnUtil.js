var CmnUtil = {
	isNullOrUndef: function(target) {
		var bln = false;
		if (target === undefined || target === null) bln = true;
		return bln;
	},
	hasRealVal: function(target) {
		var bln = true;
		if (target === undefined || target === null) bln = false;
		return bln;
	}
};