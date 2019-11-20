package com.example.core.common.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysRole;

@Mapper
public interface SysRoleMapper {
	/**
	 * 更新角色
	 * 
	 * @param sysRole
	 * @return
	 */
	Integer update(SysRole sysRole);

	/**
	 * 通过id查询角色
	 * 
	 * @param roleId
	 * @return
	 */

	JSONObject query(Integer roleId);

	/**
	 * 角色列表查询
	 * 
	 * @return
	 */

	List<JSONObject> find();

	/**
	 * 新增角色
	 */
	int insert(SysRole sysRole);

	/**
	 * 新增菜单
	 * 
	 * @param roleId
	 * @param list
	 * @return
	 */

	Integer addMenu(@Param("roleId") Integer roleId, @Param("list") ArrayList<Integer> list);

	/**
	 * 删除原有权限
	 * 
	 * @param roleId
	 * @return
	 */
	Integer delete(Integer roleId);

	/**
	 * 通过id获取菜单
	 * 
	 * @param roleId
	 * @return
	 */

	List<Integer> getAllMenuByRoleId(Integer roleId);
}