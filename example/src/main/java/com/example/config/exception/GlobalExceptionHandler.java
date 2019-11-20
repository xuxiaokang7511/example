package com.example.config.exception;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.alibaba.fastjson.JSONObject;
import com.example.until.CommonUtil;
import com.example.until.constants.MessageCode;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {
	private Logger logger = LoggerFactory.getLogger(this.getClass().getName());

	@ExceptionHandler(value = Exception.class)
	public JSONObject defaultErrorHandler(HttpServletRequest req, Exception e) {
		String errorPosition = "";
		// 如果错误堆栈信息存在
		if (e.getStackTrace().length > 0) {
			StackTraceElement element = e.getStackTrace()[0];
			String fileName = element.getFileName() == null ? "未找到错误文件" : element.getFileName();
			int lineNumber = element.getLineNumber();
			errorPosition = fileName + ":" + lineNumber;
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", MessageCode.UN_KUNW.getCode());
		jsonObject.put("msg", MessageCode.UN_KUNW.getMessage());
		JSONObject errorObject = new JSONObject();
		errorObject.put("errorLocation", e.toString() + "    错误位置:" + errorPosition);
		jsonObject.put("data", errorObject);
		logger.error("异常", e);
		return jsonObject;
	}

	/**
	 * 插入数据库唯一约束报错
	 */
	@ExceptionHandler(DuplicateKeyException.class)
	public JSONObject duplicateKeyException() {
		return CommonUtil.errorMessage(MessageCode.DuplicateKeyException);
	}

	/**
	 * 本系统自定义错误的拦截器 拦截到此错误之后,就返回这个类里面的json给前端 常见使用场景是参数校验失败,抛出此错,返回错误信息给前端
	 */
	@ExceptionHandler(CommonJsonException.class)
	public JSONObject commonJsonExceptionHandler(CommonJsonException commonJsonException) {
		return commonJsonException.getResultJson();
	}

	/**
	 * GET/POST请求方法错误的拦截器 因为开发时可能比较常见,而且发生在进入controller之前,上面的拦截器拦截不到这个错误 所以定义了这个拦截器
	 */
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public JSONObject httpRequestMethodHandler() {
		return CommonUtil.errorMessage(MessageCode.unauthorizedExceptionHandler);
	}

	/**
	 * 未登录报错拦截 在请求需要权限的接口,而连登录都还没登录的时候,会报此错
	 */
	@ExceptionHandler(UnauthenticatedException.class)
	public JSONObject unauthenticatedException() {
		return CommonUtil.errorMessage(MessageCode.Token_expired);
	}

	/**
	 * 权限不足报错拦截
	 */
	@ExceptionHandler(UnauthorizedException.class)
	public JSONObject unauthorizedExceptionHandler() {
		return CommonUtil.errorMessage(MessageCode.no_power);
	}

	/**
	 * 空指针异常 //
	 */
	@ExceptionHandler(NullPointerException.class)
	public JSONObject nullPointerException() {
		return CommonUtil.errorMessage(MessageCode.NullPointerException);
	}

	/**
	 * 文件过大
	 * 
	 * @return
	 */
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public JSONObject maxUploadSizeExceededException() {
		return CommonUtil.errorMessage(MessageCode.MaxUploadSizeExceededException);
	}

	/**
	 * 请求对象为空
	 * 
	 * @return
	 */
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public JSONObject httpMessageNotReadableException() {
		return CommonUtil.errorMessage(MessageCode.HttpMessageNotReadableException);
	}

}
