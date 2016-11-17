package com.huwl.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;

@Component
public class WebReource{
	
	@Autowired
	private ApplicationContext ctx;
	
	public void getWebData(String url) throws IOException {
		UrlResource resource = new UrlResource(url);
		InputStream is = resource.getInputStream();
		if(resource.isReadable()) {
			BufferedReader br = new BufferedReader(new InputStreamReader(is)); 
			String line;  
			while ((line=br.readLine()) != null) {  
				System.out.println(line);  
			}  
			if (is != null) {  
				is.close();  
			}  
			if (br != null) {  
				br.close();  
			}  
		}
	}
	
	
}
