package com.example.until;

public class StringTools {
	public static boolean isNullOrEmpty(String str) {
		return null == str || "".equals(str) || "null".equals(str);
	}
	public static boolean isNullOrEmpty(Object obj) {
		return null == obj || "".equals(obj);
	}
}
