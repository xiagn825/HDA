function writer(decodedTabUrl) {
	console.log("contentScript.writer.start()");
	
	var page = 0;
	var pageTmp = 0;
	var record = "";
	var recordTmp = "";
	var lineNum = 0;
	
	if (decodedTabUrl.indexOf("page=") == -1) {
		page = 1;
	}
	else {
		pageTmp = decodedTabUrl.substr(decodedTabUrl.indexOf("page=") + 5, 2);
		
		if (isNaN(pageTmp)) {
			pageTmp = decodedTabUrl.substr(decodedTabUrl.indexOf("page=") + 5, 1);
		}
		
		page = parseInt(pageTmp);
	}
	
	$("#queryschoolad").children("tbody").children("tr").each(function(iTR){
		if (iTR >= 2 && $(this).attr("class") != "getJsXmlTr") {
			record = "";
			recordTmp = "";
			
			lineNum++;
			
			$(this).children("td").each(function(iTD){
				if (iTD == 1) {
					recordTmp += $.trim($(this).children("a").attr("title"));
				}
				else if (iTD == 3) {
					recordTmp += "," + $.trim($(this).attr("title"));
				}
				else if (iTD > 1 && iTD < 7) {
					recordTmp += "," + $.trim($(this).text());
				}
			});
			
			record = $.trim(recordTmp);
			
			if (record != "") {
				var provinceCode;
				var provinceName;
				
				for (var iProvinces in provinces) {
					provinceCode = provinces[iProvinces].code;
					provinceName = provinces[iProvinces].name;
					
					if (decodedTabUrl.indexOf("province=" + provinceName) > -1) {
						window.localStorage.setItem(provinceName + "_" + formatNumberByZero(page, 2) + "_" + formatNumberByZero(lineNum, 2), record);
					}
				}
			}
		}
	});
	
	console.log("contentScript.writer.end()");
}

function reader() {
	console.log("contentScript.reader.start()");
	
	chrome.extension.sendRequest({}, function(response){
		console.log("contentScript.reader.sendRequest.response.start()");
		
		var url;
		var provinceCode;
		var provinceName;
		var year;
		var currentPage;
		
		var tabUrl = response.tabUrl;
		var decodedTabUrl = decodeURI(tabUrl);
		
		console.log("tabUrl:" + decodedTabUrl);
		
		if (decodedTabUrl == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/soudaxue/queryschool.html?province=" + provinces[0].name;
			window.location.href = encodeURI(url);
		}
		else {
			writer(decodedTabUrl);
			
			$("#pageid").children("a").each(function(idx){
				if ($(this).attr("class") == "cpl") {
					currentPage = parseInt($(this).text());
				}
				
				if ($(this).text() == "下一页") {
					if ($(this).attr("class") == "pl") {
						for (var iProvinces in provinces) {
							provinceCode = provinces[iProvinces].code;
							provinceName = provinces[iProvinces].name;
							
							if (decodedTabUrl.indexOf("province=" + provinceName) > -1) {
								url = "http://gkcx.eol.cn/soudaxue/queryschool.html?province=" + provinceName + "&page=" + (currentPage + 1);
								window.location.href = encodeURI(url);
							}
						}
					}
					else {
						for (var iProvinces in provinces) {
							provinceCode = provinces[iProvinces].code;
							provinceName = provinces[iProvinces].name;
							
							if (decodedTabUrl.indexOf("province=" + provinceName) > -1) {
								if (provinces.length > (parseInt(iProvinces) + 1)) {
									url = "http://gkcx.eol.cn/soudaxue/queryschool.html?province=" + provinces[parseInt(iProvinces) + 1].name;
									window.location.href = encodeURI(url);
								}
								else {
									console.log("=== completed ===");
								}
							}
						}
					}
				}
			});
		}
		
		console.log("contentScript.reader.sendRequest.response.end()");
	});
	
	console.log("contentScript.reader.end()");
}

setTimeout(reader, 1000);
