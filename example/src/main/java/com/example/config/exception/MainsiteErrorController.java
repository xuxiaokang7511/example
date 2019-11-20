package com.example.config.exception;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.example.until.CommonUtil;
import com.example.until.constants.MessageCode;

import io.swagger.annotations.Api;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 
 * @author xuxiaokang 2019年8月8日
 */
@Controller
@ApiIgnore
@Api(description = "无权限时跳转")
public class MainsiteErrorController implements ErrorController {

	private static final String ERROR_PATH = "/error";

	/**
	 * 主要是登陆后的各种错误路径 404页面改为返回此json 未登录的情况下,大部分接口都已经被shiro拦截,返回让用户登录了 ,
	 * 
	 */
	@RequestMapping(value = ERROR_PATH)
	@ResponseBody
	public JSONObject handleError() {
		return CommonUtil.errorMessage(MessageCode.NotFound);
	}

	@Override
	public String getErrorPath() {
		return ERROR_PATH;
	}
}
