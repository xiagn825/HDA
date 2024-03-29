var nceeView = {
	model: {},
	initialize: function() {
		this.model = nceeModel;
		this.getInitData();
	},
	render: function() {
		$("#province").kendoDropDownList({
			dataValueField: "value",
			dataTextField: "text",
			dataSource: this.model.provinces,
			index: 0
		});
		
		$("#collegeProvince").kendoDropDownList({
			dataValueField: "value",
			dataTextField: "text",
			dataSource: this.model.provinces,
			index: 0
		});
		
		$("#submit").kendoButton({
			click: this.click_submit
		});
	},
	getInitData: function() {
		$.ajax({
			type: "POST",
			url: "/hda/channel/ncee/init",
			data: null,
			dataType: "json",
			contentType: "application/json",
			success: function(data, sts, xhr) {
				this.model.setObjData(data);
				this.render();
			},
			error: this.error_ajax
		});
	},
	click_submit: function() {
		alert("submit click event");
	},
	error_ajax: function() {
		console.log("===> Failed to Ajax");
		alert("Failed to Ajax");
	}
};