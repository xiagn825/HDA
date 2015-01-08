package com.yong.hda.ncee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yong.hda.ncee.model.Province;
import com.yong.hda.ncee.model.SqlCondition;
import com.yong.hda.ncee.service.SelDBIService;

@Controller
@RequestMapping("/ncee")
public class NCEEController {
	
	@Autowired
	private SelDBIService<SqlCondition, Province> selProvinceService;
	
	@RequestMapping("/selDB")
	public @ResponseBody List<Province> selectDB() {
		return selProvinceService.selectAllData();
	}
}
