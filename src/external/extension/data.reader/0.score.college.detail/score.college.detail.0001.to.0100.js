function writer(url) {
	console.log("contentScript.writer.start()");
	
	var record;
	var recordTmp;
	
	var splitedUrl = url.split("/");
	var key = splitedUrl[5] + "_" + splitedUrl[6] + "_" + splitedUrl[7] + "_" + splitedUrl[8].substr(0, 5);
	
	$("#tableList").children("tbody").children("tr").each(function(iTR){
		if (iTR >= 1) {
			record = "";
			recordTmp = "";
			
			$(this).children("td").each(function(iTD){
				if (iTD == 0) {
					recordTmp += $.trim($(this).text());
				}
				else {
					recordTmp += "," + $.trim($(this).text());
				}
			});
			
			record = $.trim(recordTmp);
			
			if (record != "" && record != "暂时没有数据") {
				window.localStorage.setItem(key + "_" + formatNumberByZero(iTR, 2), record);
			}
		}
	});
	
	console.log("contentScript.writer.end()");
}

function reader() {
	console.log("contentScript.reader.start()");
	
	chrome.extension.sendRequest({}, function(response){
		console.log("contentScript.reader.sendRequest.response.start()");
		
		var college;
		var province;
		var studentCategory;
		var batch;
		
		var url = response.tabUrl;
		
		console.log("URL:" + url);
		
		if (url == "http://www.eol.cn/") {
			url = "http://gkcx.eol.cn/schoolhtm/schoolAreaPoint/" + scoreCollegeDetailColleges0001to0100[0] + "/" + scoreCollegeDetailProvinces[0] + "/" + scoreCollegeDetailStudentCategories[0] + "/" + scoreCollegeDetailBatches[0] + ".htm";
			window.location.href = url;
		}
		else {
			writer(url);
			
			var splitedUrl = url.split("/");
			
			college = splitedUrl[5];
			province = splitedUrl[6];
			studentCategory = splitedUrl[7];
			batch = splitedUrl[8].substr(0, 5);
			
			var hasSetUrl = false;
			
			var iBatch
			for (iBatch in scoreCollegeDetailBatches) {
				if (batch == scoreCollegeDetailBatches[iBatch]) {
					if (iBatch < scoreCollegeDetailBatches.length - 1) {
						url = "http://gkcx.eol.cn/schoolhtm/schoolAreaPoint/" + college + "/" + province + "/" + studentCategory + "/" + scoreCollegeDetailBatches[parseInt(iBatch) + 1] + ".htm";
						window.location.href = url;
						hasSetUrl = true;
					}
				}
			}
			
			if (!hasSetUrl) {
				var iStudentCategory
				for (iStudentCategory in scoreCollegeDetailStudentCategories) {
					if (studentCategory == scoreCollegeDetailStudentCategories[iStudentCategory]) {
						if (iStudentCategory < scoreCollegeDetailStudentCategories.length - 1) {
							url = "http://gkcx.eol.cn/schoolhtm/schoolAreaPoint/" + college + "/" + province + "/" + scoreCollegeDetailStudentCategories[parseInt(iStudentCategory) + 1] + "/" + scoreCollegeDetailBatches[0] + ".htm";
							window.location.href = url;
							hasSetUrl = true;
						}
					}
				}
			}
			
			if (!hasSetUrl) {
				var iProvince
				for (iProvince in scoreCollegeDetailProvinces) {
					if (province == scoreCollegeDetailProvinces[iProvince]) {
						if (iProvince < scoreCollegeDetailProvinces.length - 1) {
							url = "http://gkcx.eol.cn/schoolhtm/schoolAreaPoint/" + college + "/" + scoreCollegeDetailProvinces[parseInt(iProvince) + 1] + "/" + scoreCollegeDetailStudentCategories[0] + "/" + scoreCollegeDetailBatches[0] + ".htm";
							window.location.href = url;
							hasSetUrl = true;
						}
					}
				}
			}
			
			if (!hasSetUrl) {
				var iCollege
				for (iCollege in scoreCollegeDetailColleges0001to0100) {
					if (college == scoreCollegeDetailColleges0001to0100[iCollege]) {
						if (iCollege < scoreCollegeDetailColleges0001to0100.length - 1) {
							url = "http://gkcx.eol.cn/schoolhtm/schoolAreaPoint/" + scoreCollegeDetailColleges0001to0100[parseInt(iCollege) + 1] + "/" + scoreCollegeDetailProvinces[0] + "/" + scoreCollegeDetailStudentCategories[0] + "/" + scoreCollegeDetailBatches[0] + ".htm";
							window.location.href = url;
							hasSetUrl = true;
						}
					}
				}
			}
		}
		
		console.log("contentScript.reader.sendRequest.response.end()");
	});
	
	console.log("contentScript.reader.end()");
}

setTimeout(reader, 500);
