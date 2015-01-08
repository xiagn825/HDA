var years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013"];

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
				var provinceCode;
				var provinceName;
				var year = "";
				
				for (var iProvinces in provinces) {
					provinceCode = provinces[iProvinces].code;
					provinceName = provinces[iProvinces].name;
					
					if (decodedTabUrl.indexOf("provinceforschool=" + provinceName) > -1) {
						for (var iYears in years) {
							year = years[iYears];
							
							if (decodedTabUrl.indexOf("fsyear=" + year) > -1) {
								window.localStorage.setItem(provinceName + "_" + year + "_" + formatNumberByZero(page, 3) + "_" + formatNumberByZero(lineNum, 2), record);
							}
						}
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
			url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinces[0].name + "&fsyear=" + years[0];
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
							
							if (decodedTabUrl.indexOf("provinceforschool=" + provinceName) > -1) {
								for (var iYears in years) {
									year = years[iYears];
									
									if (decodedTabUrl.indexOf("fsyear=" + year) > -1) {
										url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinceName + "&fsyear=" + year + "&page=" + (currentPage + 1);
										window.location.href = encodeURI(url);
									}
								}
							}
						}
					}
					else {
						for (var iYears in years) {
							year = years[iYears];
							
							if (decodedTabUrl.indexOf("fsyear=" + year) > -1) {
								if (years.length > (parseInt(iYears) + 1)) {
									for (var iProvinces in provinces) {
										provinceCode = provinces[iProvinces].code;
										provinceName = provinces[iProvinces].name;
										
										if (decodedTabUrl.indexOf("provinceforschool=" + provinceName) > -1) {
											url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinceName + "&fsyear=" + years[parseInt(iYears) + 1];
											window.location.href = encodeURI(url);
										}
									}
								}
								else {
									for (var iProvinces in provinces) {
										provinceCode = provinces[iProvinces].code;
										provinceName = provinces[iProvinces].name;
										
										if (decodedTabUrl.indexOf("provinceforschool=" + provinceName) > -1) {
											if (provinces.length > (parseInt(iProvinces) + 1)) {
												url = "http://gkcx.eol.cn/soudaxue/queryProvinceScore.html?provinceforschool=" + provinces[parseInt(iProvinces) + 1] + "&fsyear=" + years[0];
												window.location.href = encodeURI(url);
											}
										}
									}
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

setTimeout(reader, 500);
