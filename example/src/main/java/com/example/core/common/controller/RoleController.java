package com.example.core.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.RoleMenu;
import com.example.core.common.entity.SysRole;
import com.example.core.common.service.RoleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * 
 * @author xuxiaokang 2019年9月24日
 */
@RestController
@RequestMapping(value = "role")
@Api(description = "角色管理管理")
public class RoleController {
	@Autowired
	private RoleService RoleService;

	/**
	 * 更新
	 */
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	@ApiOperation(value = "根据roleId更新")
	@ApiImplicitParam(dataType = "SysRole", value = "根据roleId更新", name = "SysRole", required = true)
	public JSONObject update(@RequestBody SysRole SysRole) {
		return RoleService.update(SysRole);
	}

	/**
	 * 查询
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	@ApiOperation(value = "根据roleId查询")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "query", dataType = "Integer", value = "根据roleId查询", name = "roleId", required = true) })
	public JSONObject query(Integer roleId) {
		return RoleService.query(roleId);
	}

	/**
	 * 查询全部
	 * 
	 * @return
	 */
	@ApiOperation(value = "获取角色列表", notes = "获取角色列表")
	@RequestMapping(value = "queryAll", method = RequestMethod.GET)
	public JSONObject queryAll() {
		return RoleService.list();
	}

	@ApiOperation(value = "添加角色和菜单,菜单id数据库中必须存在")
	@RequestMapping(value = "/addRoleMenu", method = RequestMethod.POST)
	public JSONObject addRoleMenu(@RequestBody RoleMenu roleMenu) {
		return RoleService.addRoleMenu(roleMenu.getSysRole(), roleMenu.getList());
	}

	@ApiOperation(value = "更新角色和菜单,菜单id数据库中必须存在")
	@RequestMapping(value = "/updateRoleMenu", method = RequestMethod.POST)
	@ApiImplicitParam(dataType = "RoleMenu", value = "更新", name = "roleMenu", required = true)
	public JSONObject updateRoleMenu(@RequestBody RoleMenu roleMenu) {
		return RoleService.updateRoleMenu(roleMenu.getSysRole(), roleMenu.getList());
	}

}
