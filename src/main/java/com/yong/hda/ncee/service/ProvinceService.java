package com.yong.hda.ncee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yong.hda.ncee.dao.ProvinceDao;
import com.yong.hda.ncee.dto.SqlData;
import com.yong.hda.ncee.model.ProvinceModel;

@Service
public class ProvinceService implements DBSimpleIService <SqlData, ProvinceModel> {
	
	@Autowired
	private ProvinceDao provinceDao;
	
	public List<ProvinceModel> selectAll() {
		return provinceDao.selectAll();
	}
	
	public List<ProvinceModel> selectByCondition(SqlData sqlData) {
		return provinceDao.selectByCondition(sqlData);
	}
	
	public int insert(SqlData sqlData) {
		return provinceDao.insert(sqlData);
	}
	
	public int updateAll(SqlData sqlData) {
		return provinceDao.updateAll(sqlData);
	}
	
	public int updateByCondition(SqlData sqlData) {
		return provinceDao.updateByCondition(sqlData);
	}
	
	public int deleteAll() {
		return provinceDao.deleteAll();
	}
	
	public int deleteByCondition(SqlData sqlData) {
		return provinceDao.deleteByCondition(sqlData);
	}
}
