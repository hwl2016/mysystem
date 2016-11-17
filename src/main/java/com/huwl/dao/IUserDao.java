package com.huwl.dao;

import java.util.List;
import java.util.Map;

import com.huwl.model.User;

public interface IUserDao {

	int findCount();

	List<User> findByPage(Map<String, Integer> map);

	int addUser(User user);

	User findById(int id);

	int editUser(User user);

	int deleteUser(int id);
	
}
