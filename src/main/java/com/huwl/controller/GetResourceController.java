package com.huwl.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GetResourceController {
	
	@ResponseBody
	@RequestMapping(value="/resource/byUrl", method=RequestMethod.POST)
	public String getByUrl(@RequestParam("targetURL") String url, HttpServletResponse response) throws IOException {
		response.setCharacterEncoding("UTF-8");
		UrlResource resource = new UrlResource(url);
		InputStream stream = resource.getInputStream();
		if(resource.isReadable()) {
			String content = getContent(stream);
			return content;
		}
		return null;
	}

	private String getContent(InputStream stream) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(stream));
		String res = "";
		String line;
		
		while (( line = br.readLine()) != null) {
			res += line + '\n';
		}
		if (stream != null) {  
			stream.close();  
		}  
		if (br != null) {  
			br.close();  
		}
		return res;
	}
	
	

}
