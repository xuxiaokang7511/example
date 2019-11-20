package com.example.core.common.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysMenu;
import com.example.core.common.service.MenuService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * 
 * @author xuxiaokang 2019年9月23日
 */
@RestController
@RequestMapping(value = "menu")
@Api(description = "菜单管理")
public class MenuController {
	@Autowired
	private MenuService MenuService;

	@ApiOperation(value = "新增菜单", notes = "创建菜单")
	@RequestMapping(value = "addMenu", method = RequestMethod.POST)
	public JSONObject addMenu(@RequestBody SysMenu menu) {
		return MenuService.addMenu(menu);
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	@ResponseBody
	@ApiOperation(value = "删除")
	@ApiImplicitParams(@ApiImplicitParam(paramType = "query", dataType = "int", value = "根据menuId删除", name = "menuId", required = true))
	public JSONObject delete(int menuId) {
		return MenuService.delete(menuId);
	}

	/**
	 * 更新
	 */
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	@ResponseBody
	@ApiOperation(value = "更新")
	@ApiImplicitParam(dataType = "SysMenu", value = "根据menuId更新", name = "menu", required = true)
	public JSONObject update(@RequestBody SysMenu menu) {
		return MenuService.update(menu);
	}

	/**
	 * 查询全部
	 * 
	 * @return
	 */
	@ApiOperation(value = "获取菜单列表", notes = "获取菜单列表")
	@RequestMapping(value = "queryAll", method = RequestMethod.POST)
	public JSONObject queryAll() {
		return MenuService.list();
	}

	/**
	 * 更新菜单
	 */
	@RequestMapping(value = "updateList", method = RequestMethod.POST)
	@ApiOperation(value = "更新菜单", notes = "更新菜单")
	public JSONObject updateList(@RequestBody List<SysMenu> list) {
		return MenuService.updateList(list);
	}

}
