package com.yong.hda.ncee.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yong.hda.dao.BaseDao;
import com.yong.hda.ncee.model.Province;

@Repository
public class ProvinceDao extends BaseDao {
	public List<Province> selectAll() {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.selectAll";
		return getSqlSession().selectList(mapper);
	}
}
