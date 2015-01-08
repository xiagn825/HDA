function isNullOrUndef(target) {
	var bln = false;
	if (target === undefined || target === null) bln = true;
	return bln;
}

function hasRealVal(target) {
	var bln = true;
	if (target === undefined || target === null) bln = false;
	return bln;
}