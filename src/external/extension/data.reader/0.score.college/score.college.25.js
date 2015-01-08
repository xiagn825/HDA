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
		page = parseInt(decodedTabUrl.substring(decodedTabUrl.indexOf("page=") + 5, decodedTabUrl.length));
	}
	
	$("#queryschoolad").children("tbody").children("tr").each(function(iTR){
		if (iTR >= 2) {
			record = "";
			recordTmp = "";
			
			lineNum++;
			
			$(this).children("td").each(function(iTD){
				if (iTD == 1) {
					recordTmp += $.trim($(this).children("a").attr("title"));
				}
				else if (iTD == 2 || iTD == 3 || iTD == 4 || iTD == 5) {
					recordTmp += "," + $.trim($(this).text());
				}
				else if (iTD == 6 || iTD == 7) {
					recordTmp += "," + $.trim($(this).children("a").text());
				}
				else if (iTD == 8) {
					recordTmp += "," + $.trim($(this).children("a").attr("href"));
				}
			});
			
			record = $.trim(recordTmp);
			
			if (record != "") {
				window.localStorage.setItem(provinces[24].name + "_" + formatNumberByZero(page, 4) + "_" + formatNumberByZero(lineNum, 2), record);
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
		var currentPage;
		
		var tabUrl = response.tabUrl;
		var decodedTabUrl = decodeURI(tabUrl);
		
		console.log("tabUrl:" + decodedTabUrl);
		
		if (decodedTabUrl == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinces[24].name;
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
						url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinces[24].name + "&page=" + (currentPage + 1);
						window.location.href = encodeURI(url);
					}
				}
			});
		}
		
		console.log("contentScript.reader.sendRequest.response.end()");
	});
	
	console.log("contentScript.reader.end()");
}

setTimeout(reader, 500);
