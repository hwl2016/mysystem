package com.huwl.model;

public class User {
	private int id;
	private String username;
	private String password;
	private String realname;
	private String birthday;
	private String gender;
	private String czs;	//Chinese Zodiac Signs 属相
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getCzs() {
		return czs;
	}
	public void setCzs(String czs) {
		this.czs = czs;
	}
	
}
