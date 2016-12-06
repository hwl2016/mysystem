package com.huwl.test;

import java.lang.reflect.Field;

import com.huwl.model.User;

public class StudyArray {
	
	public Object getProperty(Object owner, String fieldName) throws Exception {
		Class<?> ownerClass = owner.getClass();
		Field field = ownerClass.getField(fieldName);
		Object property = field.get(owner);
		return property;
	}

	public static void main(String[] args) throws Exception {
		StudyArray sa = new StudyArray();
		sa.getProperty(new User(), "birthday");

	}

}
