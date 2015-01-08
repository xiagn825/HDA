package com.yong.hda.ncee.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
@XmlRootElement(name = "valueText")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ValueText {
	@JsonProperty("value")
	private String value;

	@JsonProperty("text")
	private String text;
	
	@XmlElement(name = "value")
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	@XmlElement(name = "text")
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
}
