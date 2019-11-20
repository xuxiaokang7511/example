package com.example.until.constants;

public enum MessageCode {
	NotFound(404, "请求路径不存在"), SUCCESS(20000, "请求成功"), UN_KUNW(50000, "请求失败"), no_power(50001, "权限不足"),
	illegal_token(50002, "非法的 token（token 错误或没有）"), Other_clients_logged(50003, "其他客户端登录了"),
	Token_expired(50004, "Token 过期了"), IncorrectCredentialsException(50009, "密码错误"),
	UnknownAccountException(50010, "账号或者密码错误"), DuplicateKeyException(50011, "插入数据重复"),
	unauthorizedExceptionHandler(50012, "请求方式有误,请检查 GET/POST"), NullPointerException(50013, "参数不能为空")
	,MaxUploadSizeExceededException(50014,"文件过大 超过10M"),HttpMessageNotReadableException(50015,"请求对象为空");

	private final int code;

	private final String message;

	MessageCode(int code, String message) {
		this.code = code;
		this.message = message;

	}

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public static String getMessage(int code) {
		for (MessageCode c : MessageCode.values()) {
			if (c.getCode() == code) {
				return c.getMessage();
			}
		}
		return null;
	}

}
