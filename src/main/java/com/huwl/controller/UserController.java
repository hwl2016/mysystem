package com.huwl.controller;

import java.io.IOException;
import java.text.ParseException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.huwl.model.PageBean;
import com.huwl.model.User;
import com.huwl.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private IUserService userService;

	@ResponseBody
	@RequestMapping(value="/findAll/{currPage}", method=RequestMethod.GET)
	public void findAll(@PathVariable("currPage") int currPage, HttpServletResponse response) throws IOException {
		PageBean<User> user = userService.findByPage(currPage);
		Gson gson = new Gson();
		response.getWriter().write(gson.toJson(user));
	}
	
	@ResponseBody
	@RequestMapping(value="/findById/{id}", method=RequestMethod.GET)
	public void findById(@PathVariable("id") int id, HttpServletResponse response) throws IOException {
		User user = userService.findById(id);
		Gson gson = new Gson();
		response.getWriter().write(gson.toJson(user));
	}
	
	@ResponseBody
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addUser(
			@RequestParam("username") String username, 
			@RequestParam("password") String password, 
			@RequestParam("realname") String realname, 
			@RequestParam("gender") String gender, 
			@RequestParam("birthday") String birthday, 
			@RequestParam("czs") String czs
	) throws ParseException {
		User user = new User();
		user.setUsername(username);
		user.setPassword(password);
		user.setRealname(realname);
		user.setGender(gender);
		user.setBirthday(birthday);
		user.setCzs(czs);
		int row = -1;
		row = userService.addUser(user);
		System.out.println(row);
		return row;
	}
	
	@ResponseBody
	@RequestMapping(value="/edit/{id}", method=RequestMethod.POST)
	public int editUser(
			@PathVariable("id") int id,
			@RequestParam("username") String username, 
			@RequestParam("password") String password, 
			@RequestParam("realname") String realname, 
			@RequestParam("gender") String gender, 
			@RequestParam("birthday") String birthday, 
			@RequestParam("czs") String czs
	) throws ParseException {
		User user = new User();
		user.setId(id);
		user.setUsername(username);
		user.setPassword(password);
		user.setRealname(realname);
		user.setGender(gender);
		user.setBirthday(birthday);
		user.setCzs(czs);
		int row = -1;
		row = userService.editUser(user);
		return row;
	}
	
	@ResponseBody
	@RequestMapping(value="/delete/{id}", method=RequestMethod.POST)
	public int deleteUser(@PathVariable("id") int id) {
		int row = -1;
		row = userService.deleteUser(id);
		return row;
	}
	
}
