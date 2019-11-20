package com.example.until;

import java.util.List;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

import com.alibaba.fastjson.JSONObject;
import com.example.until.constants.MessageCode;

public class CommonUtil {

	public static JSONObject messageCode(MessageCode MessageCode) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.getCode());
		resultJson.put("msg", MessageCode.getMessage());
		return resultJson;
	}
	/**
	 *请求 成功信息和data
	 * @param message
	 * @param data
	 * @return
	 */
	public static JSONObject successMessageCode(String msg,Object data) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.SUCCESS.getCode());
		resultJson.put("msg", msg);
		resultJson.put("data", data);
		return resultJson;
	}
	public static JSONObject successMessageCode(Object data) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.SUCCESS.getCode());
		resultJson.put("msg", MessageCode.SUCCESS.getMessage());
		resultJson.put("data", data);
		return resultJson;
	}

	public static JSONObject successMessageCode(String msg) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.SUCCESS.getCode());
		resultJson.put("msg", msg);
		return resultJson;
	}


	public static JSONObject errorMessageCode(String msg) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.UN_KUNW.getCode());
		resultJson.put("msg", msg);
		return resultJson;
	}

	public static JSONObject errorMessage(MessageCode messageCode) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", messageCode.getCode());
		resultJson.put("msg", messageCode.getMessage());
		resultJson.put("data", new JSONObject());
		return resultJson;
	}

	public static String MD5Pwd(String userName, String passWord) {
		// 加密算法MD5
		// salt盐 username + salt
		// 迭代次数
		String md5Pwd = new SimpleHash("md5", passWord, ByteSource.Util.bytes(userName + "salt"), 1).toHex();
		return md5Pwd;
	}

	/**
	 * 查询分页
	 * 
	 * @param list
	 * @param total
	 * @return
	 */

	public static JSONObject pageMessageCode(List<JSONObject> list, long total) {
		JSONObject resultJson = new JSONObject();
		resultJson.put("code", MessageCode.SUCCESS.getCode());
		resultJson.put("msg", MessageCode.SUCCESS.getMessage());
		resultJson.put("total", total);
		resultJson.put("data", list);
		return resultJson;
	}

	public static JSONObject pageMessageCode(List<JSONObject> list, long total, int pageNum, int pageSize) {
		JSONObject resultJson = new JSONObject();
		JSONObject pageJson = new JSONObject();
		resultJson.put("code", MessageCode.SUCCESS.getCode());
		resultJson.put("msg", MessageCode.SUCCESS.getMessage());
		resultJson.put("data", list);
		resultJson.put("page", pageJson);
		pageJson.put("pageNum", pageNum);
		pageJson.put("pageSize", pageSize);
		pageJson.put("total", total);
		return resultJson;
	}

}
