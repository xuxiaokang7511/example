package com.example.core.common.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.dao.SysMenuMapper;
import com.example.core.common.entity.SysMenu;
import com.example.core.common.service.MenuService;
import com.example.until.CommonUtil;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private SysMenuMapper SysMenuMapper;

	@Override
	public List<JSONObject> getMenu(Integer roleId) {
		// 原始的数据
		List<JSONObject> allMenu;
		if (roleId == 1 || roleId == null) {
			allMenu = SysMenuMapper.getAllMenu();
		} else {
			allMenu = SysMenuMapper.getAllMenuByRoleId(roleId);
		}
		// 最后的结果
		List<JSONObject> menuList = new ArrayList<JSONObject>();
		for (JSONObject jsonObject : allMenu) {
			if (jsonObject.getInteger("parentId").equals(0)) {
				menuList.add(jsonObject);
			}
		}
		// 为一级菜单设置子菜单，getChild是递归调用的
		for (JSONObject jsonObject : menuList) {
			jsonObject.put("children", getChild(jsonObject.getInteger("id"), allMenu));
		}
		return menuList;
	}

	private List<JSONObject> getChild(Integer menuId, List<JSONObject> allMenu) {
		// 子菜单
		List<JSONObject> childList = new ArrayList<>();
		for (JSONObject jsonObject : allMenu) {
			// 遍历所有节点，将父菜单id与传过来的id比较
			if (!jsonObject.getInteger("parentId").equals(0)) {
				if (jsonObject.getInteger("parentId").equals(menuId)) {
					childList.add(jsonObject);
				}
			}
		}
		// 递归终止的条件,没有子权限时
		if (childList.size() == 0) {
			return null;
		}
		// 如果有子菜单还有子菜单,把子菜单的子菜单再循环一遍
		for (JSONObject jsonObject : childList) {
			jsonObject.put("children", getChild(jsonObject.getInteger("id"), allMenu));
		}
		return childList;
	}

	/**
	 * 新增一条菜单
	 */
	@Override
	public JSONObject addMenu(SysMenu menu) {
		if (menu == null) {
			return CommonUtil.errorMessageCode("必要参数缺失");
		}
		Integer add = SysMenuMapper.addMenu(menu);
		JSONObject query = SysMenuMapper.query(menu.getId());
		return add > 0 ? CommonUtil.successMessageCode("插入成功", query) : CommonUtil.errorMessageCode("插入失败");
	}

	/**
	 * 删除
	 */
	@Override
	public JSONObject delete(int menuId) {
		// 数据库级联删除菜单
		Integer delete = SysMenuMapper.deleteByMenuId(menuId);
		return delete > 0 ? CommonUtil.successMessageCode("删除成功") : CommonUtil.errorMessageCode("删除失败");
	}

	/**
	 * 更新
	 */
	@Override
	public JSONObject update(SysMenu menu) {
		Integer update = SysMenuMapper.update(menu);
		return update > 0 ? CommonUtil.successMessageCode("更新成功") : CommonUtil.errorMessageCode("更新失败");
	}

	/**
	 * 查询全部菜单
	 */

	@Override
	public JSONObject list() {
		return CommonUtil.successMessageCode("查询成功", getMenu(1));
	}

	/**
	 * 更新菜单
	 */
	@Override
	@Transactional
	public JSONObject updateList(List<SysMenu> list) {
		Integer update = 0;
		for (SysMenu sysMenu : list) {
			System.out.println(sysMenu.toString());
			update = SysMenuMapper.update(sysMenu);
		}
		return update > 0 ? CommonUtil.successMessageCode("更新成功") : CommonUtil.errorMessageCode("更新失败");
	}

}
