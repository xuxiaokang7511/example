package com.example.core.common.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.dao.SysRoleMapper;
import com.example.core.common.entity.SysRole;
import com.example.core.common.service.RoleService;
import com.example.until.CommonUtil;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private SysRoleMapper SysRoleMapper;

	/**
	 * 更新角色
	 */
	@Override
	public JSONObject update(SysRole sysRole) {
		Integer update = SysRoleMapper.update(sysRole);
		JSONObject query = SysRoleMapper.query(sysRole.getRoleId());
		return update > 0 ? CommonUtil.successMessageCode("更新成功", query) : CommonUtil.errorMessageCode("更新失败");

	}

	/**
	 * 根据id查询
	 */
	@Override
	public JSONObject query(Integer roleId) {
		JSONObject query = SysRoleMapper.query(roleId);
		List<Integer> allMenuByRoleId = SysRoleMapper.getAllMenuByRoleId(roleId);
		JSONObject data = new JSONObject();
		data.putAll(query);
		data.put("menuList", allMenuByRoleId);
		return CommonUtil.successMessageCode(data);
	}

	/**
	 * 查询角色列表
	 */

	@Override
	public JSONObject list() {
		List<JSONObject> list = SysRoleMapper.find();
		return CommonUtil.successMessageCode(list);

	}

	/**
	 * 添加角色和菜单
	 */
	@Override
	@Transactional
	public JSONObject addRoleMenu(SysRole sysRole, ArrayList<Integer> list) {
		// 新增角色
		Integer add = SysRoleMapper.insert(sysRole);
		// 新增菜单
		if (list.size() != 0) {
			Integer insert = SysRoleMapper.addMenu(sysRole.getRoleId(), list);
		}
		return add > 0 ? CommonUtil.successMessageCode("插入成功", sysRole) : CommonUtil.errorMessageCode("插入失败");
	}

	/**
	 * 更新角色和菜单
	 */
	@Override
	@Transactional
	public JSONObject updateRoleMenu(SysRole sysRole, ArrayList<Integer> list) {
		// 删除原有权限
		Integer delete = SysRoleMapper.delete(sysRole.getRoleId());
		// 添加新的角色
		Integer add = SysRoleMapper.insert(sysRole);
		// 插入新的权限
		if (list.size() != 0) {
			Integer insert = SysRoleMapper.addMenu(sysRole.getRoleId(), list);
		}
		return add > 0 ? CommonUtil.successMessageCode("更新成功") : CommonUtil.errorMessageCode("更新失败");
	}

}
