package com.example.core.common.service;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysUser;

public interface UserService {

	/**
	 * 通过名称查询用户信息
	 * 
	 * @param userName
	 * @return
	 */
	JSONObject findByUsername(String userName);

	/**
	 * 登录
	 * 
	 * @param roleName
	 */
	JSONObject authLogin(String userName, String pwd);

	/**
	 * 查询当前登录用户的信息
	 */
	JSONObject getInfo();

	/**
	 * 登出
	 */
	JSONObject logout();

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	JSONObject addUser(SysUser user);

	/**
	 * 删除用户
	 * 
	 * @param id
	 * @return
	 */
	JSONObject delete(int userId);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	JSONObject update(SysUser user);

	/**
	 * 查询用户列表
	 * 
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	JSONObject listUser(int pageNum, int pageSize);

	/**
	 * 密码修改
	 * @param oldPwd
	 * @param newPwd
	 * @return
	 */
	JSONObject resetPwd(String oldPwd, String newPwd);

}
