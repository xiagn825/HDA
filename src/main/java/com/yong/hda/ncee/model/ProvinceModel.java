package com.yong.hda.ncee.model;

import org.springframework.stereotype.Component;

@Component
public class ProvinceModel {
	private String provinceCode;
	private String provinceName;
	private String provinceNameShort;
	
	public String getProvinceCode() {
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}
	
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	
	public String getProvinceNameShort() {
		return provinceNameShort;
	}
	public void setProvinceNameShort(String provinceNameShort) {
		this.provinceNameShort = provinceNameShort;
	}
}
