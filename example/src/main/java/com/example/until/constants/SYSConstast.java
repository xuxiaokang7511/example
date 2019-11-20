package com.example.until.constants;

public interface SYSConstast {

	/**
	 * 用户类型
	 */
	public static final Integer USER_TYPE_SUPER=1;//管理员
	public static final Integer USER_TYPE_NORMAL=0;//系统用户
	
	/**
	 * 可用类型
	 */
	public static final Integer SYS_AVAILABLE_TRUE = 1;
	public static final Integer SYS_AVAILABLE_FALSE = 0;
	
	/**
	 * 是否展开
	 */
	public static final Integer SYS_OPEN_TRUE = 1;
	public static final Integer SYS_OPEN_FALSE = 0;
	
	/**
	 * 是否父节点
	 */
	public static final Integer SYS_PARENT_TRUE = 1;
	public static final Integer SYS_PARENT_FALSE = 0;
	
	/**
	 * 权限类型
	 */
	public static final String PERMISSION_TYPE_MEUN = "menu";
	public static final String PERMISSION_TYPE_PERMISSION = "permission";
	
	/**
	 * 用户默认密码
	 */
	public static final String USER_PWD_DEFAULT = "123456";
	
	/**
	 * 用户默认头像地址
	 */
	public static final String USER_DEFALUT_IMGTITLE = "../resources/images/defaultusertitle.jpg";
	/**
	 * 请假单的状态
	 */
	public static final Byte STATE_LEAVEBILL_ZORO = 0;//未提交
	public static final Byte STATE_LEAVEBILL_ONE = 1;//审批中
	public static final Byte STATE_LEAVEBILL_TOW = 2;//审批完成
	public static final Byte STATE_LEAVEBILL_THREE = 3;//已放弃

	/**
	 * 报销单的状态
	 */
	public static final Byte STATE_REIMBURSE_ZORO = 0;//未提交
	public static final Byte STATE_REIMBURSE_ONE = 1;//员工申请审批
	public static final Byte STATE_REIMBURSE_TOW = 2;//总经理审批
	public static final Byte STATE_REIMBURSE_THREE = 3;//部门经理审批
	public static final Byte STATE_REIMBURSE_FOUR = 4;//部门主管审批
	public static final Byte STATE_REIMBURSE_FIVE = 5;//总裁审批
	public static final Byte STATE_REIMBURSE_SIX = 6;//财务总监审批
	public static final Byte STATE_REIMBURSE_SEVEN = 7;//财务人员审核
	public static final Byte STATE_REIMBURSE_EIGHT = 8;//财务部门经理审核
	public static final Byte STATE_REIMBURSE_NINE = 9;//领导审批
	public static final Byte STATE_REIMBURSE_TEN = 10;//员工放弃
	public static final Byte STATE_REIMBURSE_ELEVEN = 11;//报销通过
	
	/**
	 * 入档的状态
	 */
	public static final Byte STATE_FILEMODEL_ZORO = 0;//未提交
	public static final Byte STATE_FILEMODEL_ONE = 1;//审批中
	public static final Byte STATE_FILEMODEL_TOW = 2;//部门审批完成
	public static final Byte STATE_FILEMODEL_THREE = 3;//已放弃
	public static final Byte STATE_FILEMODEL_FOUR = 4;//入档完成
	public static final Byte STATE_FILEMODEL_FIVE = 5;//申请完成
}
