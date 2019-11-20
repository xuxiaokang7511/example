package com.example.config.exception;

import com.alibaba.fastjson.JSONObject;
import com.example.until.CommonUtil;
import com.example.until.constants.MessageCode;

/**
 * 运行异常
 * 
 * @author xuxiaokang 2019年8月6日
 */

public class CommonJsonException extends RuntimeException {
	private JSONObject resultJson;

	private static final long serialVersionUID = 1L;

	/**
	 * 调用时可以在任何代码处直接throws这个Exception, 都会统一被拦截,并封装好json返回给前台
	 * 
	 * @param MessageCode
	 */

	public CommonJsonException(MessageCode messageCode) {
		this.resultJson = CommonUtil.errorMessage(messageCode);
	}

	public CommonJsonException(JSONObject resultJson) {
		this.resultJson = resultJson;
	}

	public JSONObject getResultJson() {
		return resultJson;
	}

}
