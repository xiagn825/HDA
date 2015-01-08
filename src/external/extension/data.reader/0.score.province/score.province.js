var years = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];

function writer(decodedTabUrl) {
	console.log("contentScript.writer.start()");
	
	var record = "";
	var recordTmp = "";
	
	$("#queryschoolad").children("tbody").children("tr").each(function(iTR){
		console.log("contentScript.writer.tr.each.start()");
		
		if (iTR >= 2) {
			record = "";
			recordTmp = "";
			
			$(this).children("td").each(function(iTD){
				console.log("contentScript.writer.tr.td.each.start()");
				
				if (iTD == 0) {
					recordTmp += $.trim($(this).text());
				}
				else {
					recordTmp += "," + $.trim($(this).text());
				}
				
				console.log("contentScript.writer.tr.td.each.end()");
			});
			
			record = $.trim(recordTmp);
			
			console.log("tr.record:" + record);
			
			if (record != "") {
				var provinceCode;
				var provinceName;
				var year;
				
				for (var iProvinces in provinces) {
					provinceCode = provinces[iProvinces].code;
					provinceName = provinces[iProvinces].name;
					
					for (var iYears in years) {
						year = years[iYears];
						
						if (decodedTabUrl.indexOf("province3=" + provinceName) > -1 && decodedTabUrl.indexOf("year3=" + year) > -1) {
							console.log("key:" + provinceName + "_" + year + "_" + formatNumberByZero((iTR - 1), 2));
							console.log("value:" + record);
							
							window.localStorage.setItem(provinceName + "_" + year + "_" + formatNumberByZero((iTR - 1), 2), record);
						}
					}
				}
			}
		}
		
		console.log("contentScript.writer.tr.each.end()");
	});
	
	console.log("contentScript.writer.end()");
}

function reader() {
	console.log("contentScript.reader.start()");
	
	chrome.extension.sendRequest({}, function(response){
		console.log("contentScript.reader.sendRequest.start()");
		
		var url;
		var provinceCode;
		var provinceName;
		var year;
		
		var tabUrl = response.tabUrl;
		var decodedTabUrl = decodeURI(tabUrl);
		
		console.log("tabUrl:" + decodedTabUrl);
		
		if (decodedTabUrl == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/soudaxue/queryProvince.html?province3=" + provinces[0].name + "&year3=" + years[0];
			
			console.log("href:" + url);
			
			window.location.href = encodeURI(url);
		}
		else {
			for (var iYears in years) {
				year = years[iYears];
				
				if (decodedTabUrl.indexOf("year3=" + year) > -1) {
					writer(decodedTabUrl);
					
					if (years.length > (parseInt(iYears) + 1)) {
						for (var iProvinces in provinces) {
							provinceCode = provinces[iProvinces].code;
							provinceName = provinces[iProvinces].name;
							
							if (decodedTabUrl.indexOf("province3=" + provinceName) > -1) {
								url = "http://gkcx.eol.cn/soudaxue/queryProvince.html?province3=" + provinceName + "&year3=" + years[parseInt(iYears) + 1];
								
								console.log("href:" + url);
								
								window.location.href = encodeURI(url);
							}
						}
					}
					else {
						for (var iProvinces in provinces) {
							provinceCode = provinces[iProvinces].code;
							provinceName = provinces[iProvinces].name;
							
							if (decodedTabUrl.indexOf("province3=" + provinceName) > -1) {
								if (provinces.length > (parseInt(iProvinces) + 1)) {
									url = "http://gkcx.eol.cn/soudaxue/queryProvince.html?province3=" + provinces[parseInt(iProvinces) + 1].name + "&year3=" + years[0];
									
									console.log("href:" + url);
									
									window.location.href = encodeURI(url);
								}
							}
						}
					}
				}
			}
		}
		
		console.log("contentScript.reader.sendRequest.end()");
	});
	
	console.log("contentScript.reader.end()");
}

setTimeout(reader, 1000);
