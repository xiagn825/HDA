package com.yong.hda.ncee.dto;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestData {
	@JsonProperty("sqlData")
	private SqlData sqlData;

	public SqlData getSqlData() {
		return sqlData;
	}

	public void setSqlData(SqlData sqlData) {
		this.sqlData = sqlData;
	}
}
