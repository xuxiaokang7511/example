package com.example.core.common.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysUser;
import com.example.core.common.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * 
 * @author xuxiaokang 2019年9月23日
 */
@RestController
@RequestMapping(value = "user")
@Api(description = "用户管理")
public class UserController {

	@Autowired
	private UserService UserService;

	/**
	 * 登录
	 */

	@ApiOperation(value = "登录", notes = "登录")
	@RequestMapping(value = "authLogin", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public JSONObject authLogin(@RequestBody SysUser user) {
		return UserService.authLogin(user.getUserName(), user.getPwd());
	}

	/**
	 * 查询当前登录用户的信息
	 */
	@ApiOperation(value = "查询当前用户菜单信息", notes = "查询当前用户菜单信息")
	@PostMapping("/getInfo")
	public JSONObject getInfo() {
		return UserService.getInfo();
	}

	/**
	 * 登出
	 */
	@ApiOperation(value = "登出", notes = "登出")
	@PostMapping("/logout")
	public JSONObject logout() {
		return UserService.logout();
	}

	/**
	 * 查询用户列表
	 * 
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	@ApiOperation(value = "获取用户列表", notes = "获取用户列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "query", name = "pageNum", defaultValue = "1", value = "页码", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "pageSize", defaultValue = "10", value = "每页显示数量", dataType = "int") })
	@RequestMapping(value = "queryAll", method = RequestMethod.POST)
	public JSONObject queryAll(@RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		return UserService.listUser(pageNum, pageSize);
	}

	@ApiOperation(value = "创建用户", notes = "根据User对象创建用户")
	@RequestMapping(value = "addUser", method = RequestMethod.POST)
	public JSONObject addUser(@RequestBody SysUser user) {
		return UserService.addUser(user);
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	@ApiOperation(value = "用户删除")
	@ApiImplicitParams(@ApiImplicitParam(paramType = "query", dataType = "int", value = "根据id删除", name = "userId", required = true))
	public JSONObject delete(int userId) {
		return UserService.delete(userId);
	}

	/**
	 * 更新
	 */
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	@ResponseBody
	@ApiOperation(value = "用户更新")
	@ApiImplicitParam(dataType = "SysUser", value = "更新", name = "user")
	public JSONObject update(@RequestBody SysUser user) {
		return UserService.update(user);
	}
	
	/**
	 * 密码修改
	 */
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	@ResponseBody
	@ApiOperation(value = "密码修改")
	public JSONObject resetPwd(@RequestParam(value = "oldPwd") String oldPwd,@RequestParam(value = "newPwd") String newPwd) {
		return UserService.resetPwd(oldPwd,newPwd);
	}
}
