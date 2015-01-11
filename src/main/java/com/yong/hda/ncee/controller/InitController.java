package com.yong.hda.ncee.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yong.hda.ncee.dto.DropDownListData;
import com.yong.hda.ncee.dto.RequestData;
import com.yong.hda.ncee.dto.ResponseData;
import com.yong.hda.ncee.dto.SqlData;
import com.yong.hda.ncee.model.ProvinceModel;
import com.yong.hda.ncee.service.DBSimpleIService;

@Controller
@RequestMapping("/ncee")
public class InitController {
	
	@Autowired
	private DBSimpleIService<SqlData, ProvinceModel> provinceService;
	
	@RequestMapping("/init")
	public ResponseData initialize(RequestData requestData) {
		ResponseData responseData = new ResponseData();
		
		DropDownListData dropDownListData = null;
		List<DropDownListData> dropDownListDataLst = new ArrayList<DropDownListData>();
		
		List<ProvinceModel> provinces = provinceService.selectAll();
		for (ProvinceModel province : provinces) {
			dropDownListData = new DropDownListData();
			dropDownListData.setId("province");
			dropDownListData.setValue(province.getProvinceCode());
			dropDownListData.setText(province.getProvinceNameShort());
			dropDownListDataLst.add(dropDownListData);
		}
		
		responseData.setDropDownListDataLst(dropDownListDataLst);
		
		return responseData;
	}
}
