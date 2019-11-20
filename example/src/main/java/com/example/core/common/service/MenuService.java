package com.example.core.common.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysMenu;

public interface MenuService {
	/**
	 * 通过角色id获取菜单
	 * 
	 * @param roleId
	 * @return
	 */

	List<JSONObject> getMenu(Integer roleId);

	/**
	 * 新增一条菜单
	 * 
	 * @param menu
	 * @return
	 */

	JSONObject addMenu(SysMenu menu);

	/**
	 * 删除
	 * 
	 * @param menuId
	 * @return
	 */
	JSONObject delete(int menuId);

	/**
	 * 更新
	 * 
	 * @param menu
	 * @return
	 */

	JSONObject update(SysMenu menu);

	/**
	 * 查询全部菜单
	 * 
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */

	JSONObject list();

	/**
	 * 更新菜单
	 * 
	 * @param menuList
	 * @return
	 */
	JSONObject updateList(List<SysMenu> list);

}
