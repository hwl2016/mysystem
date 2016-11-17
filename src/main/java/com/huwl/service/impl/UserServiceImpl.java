package com.huwl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huwl.dao.IUserDao;
import com.huwl.model.PageBean;
import com.huwl.model.User;
import com.huwl.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private IUserDao userDao;

	@Override
	public PageBean<User> findByPage(int currPage) {
		PageBean<User> pageBean = new PageBean<User>();
		//封装当前页数
		pageBean.setCurrPage(currPage);
		//封装每页显示的记录数
		int pageSize = 15;
		pageBean.setPageSize(pageSize);
		//封装总的记录数
		int totalCount = userDao.findCount();
		pageBean.setTotalCount(totalCount);
		//封装总的页数
		double tc = totalCount;
		Double totalPage = Math.ceil(tc / pageSize);
		pageBean.setTotalPage(totalPage.intValue());
		//封装每页显示的记录
		int begin = (currPage - 1) * pageSize;
		
		Map<String,Integer> map = new HashMap<String,Integer>();
		map.put("begin", begin);
		map.put("pageSize", pageSize);
		List<User> list = userDao.findByPage(map);
		pageBean.setList(list);
		
		return pageBean;
	}

	@Override
	public int addUser(User user) {
		int row = -1;
		row = userDao.addUser(user);
		return row;
	}

	@Override
	public User findById(int id) {
		return userDao.findById(id);
	}

	@Override
	public int editUser(User user) {
		int row = -1;
		row = userDao.editUser(user);
		return row;
	}

	@Override
	public int deleteUser(int id) {
		return userDao.deleteUser(id);
	}
	
}
