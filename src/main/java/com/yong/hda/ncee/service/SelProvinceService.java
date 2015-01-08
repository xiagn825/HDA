package com.yong.hda.ncee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yong.hda.ncee.dao.ProvinceDao;
import com.yong.hda.ncee.model.Province;
import com.yong.hda.ncee.model.SqlCondition;

@Service
public class SelProvinceService implements SelDBIService <SqlCondition, Province> {
	
	@Autowired
	private ProvinceDao provinceDao;
	
	public List<Province> selectAllData() {
		return provinceDao.selectAll();
	}
	
	public List<Province> selectDataByCondition(SqlCondition condition) {
		return provinceDao.selectAll();
	}
}
