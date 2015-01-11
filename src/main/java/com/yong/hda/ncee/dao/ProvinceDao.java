package com.yong.hda.ncee.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yong.hda.dao.BaseDao;
import com.yong.hda.ncee.dto.SqlData;
import com.yong.hda.ncee.model.ProvinceModel;

@Repository
public class ProvinceDao extends BaseDao {
	public List<ProvinceModel> selectAll() {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.selectAll";
		return getSqlSession().selectList(mapper);
	}
	
	public List<ProvinceModel> selectByCondition(SqlData sqlData) {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.selectByCondition";
		return getSqlSession().selectList(mapper, sqlData);
	}
	
	public int insert(SqlData sqlData) {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.insert";
		return getSqlSession().insert(mapper, sqlData);
	}
	
	public int updateAll(SqlData sqlData) {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.updateAll";
		return getSqlSession().update(mapper, sqlData);
	}
	
	public int updateByCondition(SqlData sqlData) {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.updateByCondition";
		return getSqlSession().update(mapper, sqlData);
	}
	
	public int deleteAll() {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.deleteAll";
		return getSqlSession().delete(mapper);
	}
	
	public int deleteByCondition(SqlData sqlData) {
		String mapper = "com.yong.hda.ncee.mapper.ProvinceMapper.deleteByCondition";
		return getSqlSession().delete(mapper, sqlData);
	}
}
