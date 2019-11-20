package com.example.core.common.service;

import java.util.ArrayList;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysRole;

public interface RoleService {
	/**
	 * 更新
	 * 
	 * @param sysRole
	 * @return
	 */

	JSONObject update(SysRole sysRole);

	/**
	 * 通过roleId查询
	 * 
	 * @param roleId
	 * @return
	 */

	JSONObject query(Integer roleId);

	/**
	 * 添加角色和菜单
	 * 
	 * @param sysRole
	 * @param list
	 * @return
	 */

	JSONObject addRoleMenu(SysRole sysRole, ArrayList<Integer> list);

	/**
	 * 更新角色和菜单
	 * 
	 * @param sysRole
	 * @param list
	 * @return
	 */

	JSONObject updateRoleMenu(SysRole sysRole, ArrayList<Integer> list);

	/**
	 * 获取角色列表
	 * 
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */

	JSONObject list();

}
