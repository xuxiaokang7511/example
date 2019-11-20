package com.example.core.common.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.alibaba.fastjson.JSONObject;
import com.example.core.common.entity.SysUser;

@Mapper
public interface SysUserMapper {
	/**
	 * 通过用户名到数据库获取凭证
	 */
	JSONObject findByUsername(@Param("userName") String userName);

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	Integer addUser(SysUser user);

	/**
	 * 用户id查询用户
	 * 
	 * @param userId
	 * @return
	 */
	JSONObject query(Integer userId);

	/**
	 * 用户id删除用户
	 * 
	 * @param id
	 * @return
	 */
	Integer delete(int userId);

	/**
	 * 用户更新
	 * 
	 * @param user
	 * @return
	 */
	Integer update(SysUser user);

	/**
	 * 用户查询
	 * 
	 * @return
	 */
	List<JSONObject> find(@Param("userType") int userType);

}