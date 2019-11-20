package com.example.until;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysUser;

/**
 * 解耦的方式得到web作用域
 * 
 * @author LJH
 *
 */
public class SessionUtils {

	/**
	 * 得到request
	 */
	public static HttpServletRequest getCurrentServletRequest() {
		ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes();
		HttpServletRequest request = requestAttributes.getRequest();
		return request;
	}

	/**
	 * 得到session
	 */
	public static HttpSession getCurrentSession() {
		return getCurrentServletRequest().getSession();
	}

	/**
	 * 得到sesison里面的用户
	 */
	public static SysUser getCurrentUser() {
		// String类型的JSON字符串转换成Javabean对象
		JSONObject userInfo = (JSONObject) getCurrentSession().getAttribute("userInfo");
		SysUser user = JSONObject.toJavaObject(userInfo, SysUser.class);
		return user;
	}

	/**
	 * 得到sesison里面的用户
	 */
	public static String getCurrentUserName() {
		JSONObject userInfo = (JSONObject) getCurrentSession().getAttribute("userInfo");
		return userInfo.getString("userName");
	}
}
