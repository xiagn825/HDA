package com.yong.hda.ncee.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
@JsonIgnoreProperties(ignoreUnknown = true)
public class ResponseData {
	@JsonProperty("dropDownListDataLst")
	private List<DropDownListData> dropDownListDataLst;

	public List<DropDownListData> getDropDownListDataLst() {
		return dropDownListDataLst;
	}
	public void setDropDownListDataLst(List<DropDownListData> dropDownListDataLst) {
		this.dropDownListDataLst = dropDownListDataLst;
	}
}
