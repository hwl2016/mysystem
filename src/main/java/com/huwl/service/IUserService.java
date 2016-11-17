package com.huwl.service;

import com.huwl.model.PageBean;
import com.huwl.model.User;

public interface IUserService {

	PageBean<User> findByPage(int page);

	int addUser(User user);

	User findById(int id);

	int editUser(User user);

	int deleteUser(int id);

}
