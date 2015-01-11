var nceeModel = {
	provinces: [],
	setObjData: function(data) {
		if (CmnUtil.isNullOrUndef(data)) return;
		
		var dropDownListData;
		var dropDownListDataLst = data.dropDownListDataLst;
		for (var i = 0; i < dropDownListDataLst.lenght; i++) {
			dropDownListData = dropDownListDataLst[i];
			if (dropDownListData.id === "province") {
				this.provinces.push({"value": dropDownListData.value, "text": dropDownListData.text});
			}
		}
	}
};