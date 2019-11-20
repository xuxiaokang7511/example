package com.example.core.common.service.impl;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.dao.SysUserMapper;
import com.example.core.common.entity.SysUser;
import com.example.core.common.service.MenuService;
import com.example.core.common.service.UserService;
import com.example.until.CommonUtil;
import com.example.until.SessionUtils;
import com.example.until.constants.MessageCode;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private SysUserMapper SysUserMapper;

	@Autowired
	private MenuService MenuService;

	/**
	 * 通过用户名到数据库获取凭证
	 */
	@Override
	public JSONObject findByUsername(String userName) {
		return SysUserMapper.findByUsername(userName);
	}

	/**
	 * 登录
	 */
	@Override
	public JSONObject authLogin(String userName, String pwd) {
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(userName, pwd);
		try {
			subject.login(token);
		} catch (IncorrectCredentialsException e) {
			// 密码错误
			return CommonUtil.errorMessageCode("密码错误");
		} catch (Exception e) {
			return CommonUtil.errorMessageCode("账号或者密码错误");
		}
		// 登录成功
		return CommonUtil.successMessageCode("登录成功");
	}

	/**
	 * 查询当前登录信息
	 */
	@Override
	public JSONObject getInfo() {
		// 从session获取用户信息
		JSONObject userinfo = (JSONObject) SecurityUtils.getSubject().getSession().getAttribute("userInfo");
		if (userinfo == null) {
			return CommonUtil.errorMessage(MessageCode.Token_expired);
		}
		Integer roleId = userinfo.getInteger("roleId");
		List<JSONObject> menuList = MenuService.getMenu(roleId);
		JSONObject userPermission = new JSONObject();
		JSONObject data = new JSONObject();
		data.putAll(userinfo);
		data.put("menus_source", menuList);

		userPermission.put("userPermission", data);
		return CommonUtil.successMessageCode(userPermission);
	}

	/**
	 * 登出
	 */
	@Override
	public JSONObject logout() {
		try {
			Subject currentUser = SecurityUtils.getSubject();
			currentUser.logout();
		} catch (Exception e) {
		}
		return CommonUtil.successMessageCode("登出成功");
	}

	/**
	 * 添加用户
	 */
	@Override
	public JSONObject addUser(SysUser user) {
		if (user == null) {
			return CommonUtil.errorMessageCode("必要参数缺失");
		}
		user.setUserType(0);
		if (user.getPwd() != null) {
			user.setPwd(CommonUtil.MD5Pwd(user.getUserName(), user.getPwd()));
		}
		Integer add = SysUserMapper.addUser(user);
		JSONObject query = SysUserMapper.query(user.getUserId());
		return add > 0 ? CommonUtil.successMessageCode("插入成功", query) : CommonUtil.errorMessageCode("插入失败");
	}

	/**
	 * 用户id删除用户
	 */
	@Override
	public JSONObject delete(int userId) {
		Integer delete = SysUserMapper.delete(userId);
		return delete > 0 ? CommonUtil.successMessageCode("删除成功") : CommonUtil.errorMessageCode("删除失败");
	}

	/**
	 * 用户更新
	 */
	@Override
	public JSONObject update(SysUser user) {
		if (user.getPwd() != null) {
			user.setPwd(CommonUtil.MD5Pwd(user.getUserName(), user.getPwd()));
		}
		Integer update = SysUserMapper.update(user);
		JSONObject query = SysUserMapper.query(user.getUserId());
		return update > 0 ? CommonUtil.successMessageCode("更新成功", query) : CommonUtil.errorMessageCode("更新失败");

	}

	/**
	 * 用户列表查询
	 */
	@Override
	public JSONObject listUser(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		int userType = 0;
		List<JSONObject> list = SysUserMapper.find(userType);
		PageInfo<JSONObject> pageDate = new PageInfo<>(list);
		return CommonUtil.pageMessageCode(pageDate.getList(), pageDate.getTotal(), pageDate.getPageNum(),
				pageDate.getPageSize());
	}

	@Override
	public JSONObject resetPwd(String oldPwd, String newPwd) {
		Subject subject = SecurityUtils.getSubject();
		SysUser user = SessionUtils.getCurrentUser();
		UsernamePasswordToken token = new UsernamePasswordToken(user.getUserName(), oldPwd);
		try {
			subject.login(token);
		} catch (IncorrectCredentialsException e) {
			// 密码错误
			return CommonUtil.errorMessageCode("密码错误");
		}
		if (newPwd != null) {
			user.setPwd(CommonUtil.MD5Pwd(user.getUserName(), newPwd));
		}
		Integer update = SysUserMapper.update(user);
//		JSONObject query = SysUserMapper.query(user.getUserId());
		return update > 0 ? CommonUtil.successMessageCode("更新成功") : CommonUtil.errorMessageCode("更新失败");
	}

}
