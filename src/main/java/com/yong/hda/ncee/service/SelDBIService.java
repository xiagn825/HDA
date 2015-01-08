package com.yong.hda.ncee.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface SelDBIService <IN, OUT>  {
	List<OUT> selectAllData();
	List<OUT> selectDataByCondition(IN in);
}
