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
		if (iTR >= 2) {
			record = "";
			recordTmp = "";
			
			lineNum++;
			
			$(this).children("td").each(function(iTD){
				if ($(this).attr("class") == "white_border_left01") {
					if (iTD == 0) {
						recordTmp += $.trim($(this).attr("title"));
					}
					else if (iTD == 1 || iTD == 3) {
						recordTmp += "," + $.trim($(this).text());
					}
					else if (iTD == 2) {
						recordTmp += "," + $.trim($(this).children("a").text());
					}
				}
			});
			
			record = $.trim(recordTmp);
			
			if (record != "") {
				var categoryCode;
				var categoryName;
				
				for (var iCategories in specialtyCategories) {
					categoryCode = specialtyCategories[iCategories].code;
					categoryName = specialtyCategories[iCategories].name;
					
					if (decodedTabUrl.indexOf("zytype=" + categoryName) > -1) {
						window.localStorage.setItem(categoryName + "_" + formatNumberByZero(page, 2) + "_" + formatNumberByZero(lineNum, 2), record);
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
		var categoryCode;
		var categoryName;
		var year;
		var currentPage;
		
		var tabUrl = response.tabUrl;
		var decodedTabUrl = decodeURI(tabUrl);
		
		console.log("tabUrl:" + decodedTabUrl);
		
		if (decodedTabUrl == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/soudaxue/queryspecialty.html?zytype=" + specialtyCategories[0].name;
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
						for (var iCategories in specialtyCategories) {
							categoryCode = specialtyCategories[iCategories].code;
							categoryName = specialtyCategories[iCategories].name;
							
							if (decodedTabUrl.indexOf("zytype=" + categoryName) > -1) {
								url = "http://gkcx.eol.cn/soudaxue/queryspecialty.html?zytype=" + categoryName + "&page=" + (currentPage + 1);
								window.location.href = encodeURI(url);
							}
						}
					}
					else {
						for (var iCategories in specialtyCategories) {
							categoryCode = specialtyCategories[iCategories].code;
							categoryName = specialtyCategories[iCategories].name;
							
							if (decodedTabUrl.indexOf("zytype=" + categoryName) > -1) {
								if (specialtyCategories.length > (parseInt(iCategories) + 1)) {
									url = "http://gkcx.eol.cn/soudaxue/queryspecialty.html?zytype=" + specialtyCategories[parseInt(iCategories) + 1].name;
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
