function formatNumberByZero(num, length) {
	var numString = num.toString();
	
	if (length <= 0) {
		return numString;
	}
	
	var idx;
	var zeroString = "";
	
	for (idx = numString.length; idx < length; idx++) {
		zeroString = zeroString + "0";
	}
	
	return zeroString + numString;
}