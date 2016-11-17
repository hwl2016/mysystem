package com.huwl.test;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.BlockJUnit4ClassRunner;

import com.huwl.controller.GetResourceController;
import com.huwl.controller.WebReource;

@RunWith(BlockJUnit4ClassRunner.class)
public class TestResource extends Unit4Base {
	
	public TestResource() {
		super("classpath:config/spring-resource.xml");
	}
	
	@Test
	public void testGetWebData() throws IOException {
		WebReource webReource = super.getBean("webReource");
		webReource.getWebData("http://www.mofangworld.com/");
	}
	
	@Test
	public void testUrl() throws IOException {
		GetResourceController grc = super.getBean("getResourceController");
//		System.out.println(grc.getByUrl("http://www.mofangworld.com/"));
//		grc.getByUrl("http://www.mofangworld.com/");
	}
	
}
