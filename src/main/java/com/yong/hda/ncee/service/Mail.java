package com.yong.hda.ncee.service;

import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Service;

@Service
public class Mail {

	private Properties props;
	private Multipart multiPart;
	private MimeMessage mimeMsg;
	
	public String send() throws Exception {
		if (this.props == null) this.props = System.getProperties();
		this.props.put("mail.smtp.host", "smtp.163.com");
		this.props.put("mail.smtp.port", "994");
		this.props.put("mail.smtp.auth", "true");
		
		this.mimeMsg = new MimeMessage(Session.getDefaultInstance(this.props, null));
		this.multiPart = new MimeMultipart();
		
		this.mimeMsg.setSubject("NCEE REQUEST");
		this.mimeMsg.setFrom(new InternetAddress("mjaiwy@163.com"));
		this.mimeMsg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("mjaiwy@163.com"));
		
		BodyPart bodyPart = new MimeBodyPart();
		bodyPart.setContent("LiaoNing,524", "text/html;charset=UTF-8");
		this.multiPart.addBodyPart(bodyPart);
		this.mimeMsg.setContent(this.multiPart);
		
		this.mimeMsg.saveChanges();
		
		Transport transport = Session.getInstance(this.props, null).getTransport("smtp");
		transport.connect("smtp.163.com", "mjaiwy", "wyong2893847");
		transport.sendMessage(mimeMsg, mimeMsg.getRecipients(Message.RecipientType.TO)); 
		
		transport.close(); 
		
		return "0";
	}
}
