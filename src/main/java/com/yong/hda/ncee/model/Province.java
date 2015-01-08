package com.yong.hda.ncee.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.stereotype.Component;

@Component
@XmlRootElement(name = "province")
public class Province {
	private String provinceCode;
	private String provinceName;
	private String provinceNameShort;
	
	@XmlElement(name = "provinceCode")
	public String getProvinceCode() {
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}
	
	@XmlElement(name = "provinceName")
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	
	@XmlElement(name = "provinceNameShort")
	public String getProvinceNameShort() {
		return provinceNameShort;
	}
	public void setProvinceNameShort(String provinceNameShort) {
		this.provinceNameShort = provinceNameShort;
	}
}
