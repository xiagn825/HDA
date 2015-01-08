var nceeModel = {
	provinces: [],
	setObjData: function(data) {
		if (isNullOrUndef(data)) return;
		
		var obj;
		for (var i = 0; i < data.lenght; i++) {
			obj = data[i];
			if (obj.tbl === "province") {
				this.provinces.push({"value": obj.value, "text": obj.text});
			}
		}
	}
};