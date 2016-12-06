package com.huwl.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestDate {
	public static void main(String[] args) throws ParseException {
		String str = "1988-01-01 00:00:00";
		SimpleDateFormat sfd = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date = sfd.parse(str);
		System.out.println(date.getTime());
	}
}
