package com.example.config.shiro;

import java.util.Collection;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.service.UserService;

public class UserRealm extends AuthorizingRealm {
	private Logger logger = LoggerFactory.getLogger(UserRealm.class);

	@Autowired
	private UserService UserService;

	// 权限验证
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		Session session = SecurityUtils.getSubject().getSession();
		// 查询用户的权限
		JSONObject permission = (JSONObject) session.getAttribute("userPermission");
		logger.info("permission的值为:" + permission);
		logger.info("本用户权限为:" + permission.get("permissionList"));
		// 为当前用户设置角色和权限
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		authorizationInfo.addStringPermissions((Collection<String>) permission.get("permissionList"));
		return authorizationInfo;
	}

	// 身份验证
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String userName = (String) token.getPrincipal();
		// 通过用户名到数据库获取凭证
		JSONObject user = UserService.findByUsername(userName);

		if (user == null) {
			// 没有返回登录用户名对应的SimpleAuthenticationInfo对象时,就会在LoginController中抛出UnknownAccountException异常
			return null;
		}

		// 验证通过返回一个封装了用户信息的AuthenticationInfo实例即可。
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(user.getString("userName"), // 用户信息
				user.getString("pwd"), // 密码
				ByteSource.Util.bytes(user.getString("userName") + "salt"), // 盐
				getName() // realm name
		);

		// session中不需要保存密码
		user.remove("pwd");
		// 将用户信息放入session中
		SecurityUtils.getSubject().getSession().setAttribute("userInfo", user);
		return authenticationInfo;
	}

}
