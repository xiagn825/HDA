var tmpCollegeFeatures = [{"code": "04", "name": "中央部委"}, {"code": "05", "name": "自主招生试点"}];

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
				var featureCode;
				var featureName;
				
				for (var iFeatures in tmpCollegeFeatures) {
					featureCode = tmpCollegeFeatures[iFeatures].code;
					featureName = tmpCollegeFeatures[iFeatures].name;
					
					if (decodedTabUrl.indexOf("schoolflag=" + featureName) > -1) {
						window.localStorage.setItem(featureName + "_" + formatNumberByZero(page, 2) + "_" + formatNumberByZero(lineNum, 2), record);
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
		var featureCode;
		var featureName;
		var year;
		var currentPage;
		
		var tabUrl = response.tabUrl;
		var decodedTabUrl = decodeURI(tabUrl);
		
		console.log("tabUrl:" + decodedTabUrl);
		
		if (decodedTabUrl == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/soudaxue/queryschool.html?schoolflag=" + tmpCollegeFeatures[0].name;
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
						for (var iFeatures in tmpCollegeFeatures) {
							featureCode = tmpCollegeFeatures[iFeatures].code;
							featureName = tmpCollegeFeatures[iFeatures].name;
							
							if (decodedTabUrl.indexOf("schoolflag=" + featureName) > -1) {
								url = "http://gkcx.eol.cn/soudaxue/queryschool.html?schoolflag=" + featureName + "&page=" + (currentPage + 1);
								window.location.href = encodeURI(url);
							}
						}
					}
					else {
						for (var iFeatures in tmpCollegeFeatures) {
							featureCode = tmpCollegeFeatures[iFeatures].code;
							featureName = tmpCollegeFeatures[iFeatures].name;
							
							if (decodedTabUrl.indexOf("schoolflag=" + featureName) > -1) {
								if (tmpCollegeFeatures.length > (parseInt(iFeatures) + 1)) {
									url = "http://gkcx.eol.cn/soudaxue/queryschool.html?schoolflag=" + tmpCollegeFeatures[parseInt(iFeatures) + 1].name;
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
