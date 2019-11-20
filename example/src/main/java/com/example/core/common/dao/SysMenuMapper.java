package com.example.core.common.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysMenu;

@Mapper
public interface SysMenuMapper {

	/**
	 * 通过角色id获取菜单
	 * 
	 * @param roleId
	 * @return
	 */

	List<JSONObject> getAllMenuByRoleId(Integer roleId);

	/**
	 * 查询全部菜单
	 * 
	 * @return
	 */
	List<JSONObject> getAllMenu();

	/**
	 * 新增一条菜单
	 * 
	 * @param menu
	 * @return
	 */

	Integer addMenu(SysMenu menu);

	/**
	 * 数据库级联删除
	 * 
	 * @param menuId
	 * @return
	 */

	Integer deleteByMenuId(@Param("menuId") int menuId);

	/**
	 * 更新
	 * 
	 * @param menu
	 * @return
	 */

	Integer update(SysMenu menu);

	/**
	 * 通过menuId获取菜单
	 * 
	 * @param menuId
	 * @return
	 */

	JSONObject query(Integer menuId);

	/**
	 * list更新
	 * 
	 * @param list
	 * @return
	 */

	/**
	 * 删除菜单表
	 * 
	 * @return
	 */
	Integer delete();

	/**
	 * 插入角色菜单表
	 * 
	 * @param roleId
	 * @param list
	 * @return
	 */

	Integer insertRoleList(@Param("roleId") Integer roleId, @Param("list") List<SysMenu> list);

	/**
	 * 插入菜单表
	 * 
	 * @param list
	 * @return
	 */
	Integer insertList(@Param("list") List<SysMenu> list);
}