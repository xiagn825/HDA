package com.yong.hda.ncee.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface DBSimpleIService <IN, OUT>  {
	List<OUT> selectAll();
	List<OUT> selectByCondition(IN in);
	int insert(IN in);
	int updateAll(IN in);
	int updateByCondition(IN in);
	int deleteAll();
	int deleteByCondition(IN in);
}
