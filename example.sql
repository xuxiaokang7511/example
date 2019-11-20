/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.1.222mysql
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 192.168.1.222:3306
 Source Schema         : example

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 20/11/2019 09:49:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `page` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'vue路径对应页面',
  `hidden` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 1 COMMENT '页面是否隐藏',
  `parent_id` int(11) NULL DEFAULT NULL COMMENT '目录父级id',
  `sort` int(255) NULL DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '菜单管理', 'edit', 'Menu', 0, 26, 0);
INSERT INTO `sys_menu` VALUES (21, '用户管理', 'peoples', 'User', 0, 26, 1);
INSERT INTO `sys_menu` VALUES (26, '系统管理', 'setting', NULL, 0, 0, 1);
INSERT INTO `sys_menu` VALUES (27, '角色管理', 'lock', 'RolePermissionList', 0, 28, 0);
INSERT INTO `sys_menu` VALUES (28, '角色', 'edit', NULL, 0, 26, 2);
INSERT INTO `sys_menu` VALUES (29, '创建角色', 'lock', 'CreateRolePermission', 1, 28, 1);
INSERT INTO `sys_menu` VALUES (30, '编辑角色', 'edit', 'EditRolePermission', 1, 28, 2);
INSERT INTO `sys_menu` VALUES (41, '界面设置', 'layout', 'Theme', 0, 26, 3);
INSERT INTO `sys_menu` VALUES (46, '组件示例', 'example', '', 0, 0, 0);
INSERT INTO `sys_menu` VALUES (47, '图标', 'icon', 'Icons', 0, 46, 0);
INSERT INTO `sys_menu` VALUES (48, '上传', 'upload', 'UploadDemo', 0, 46, 1);
INSERT INTO `sys_menu` VALUES (49, '图片裁剪', 'edit', 'CropperUploadDemo', 0, 46, 2);
INSERT INTO `sys_menu` VALUES (50, '富文本编辑器', 'tinymce', 'TinymceDemo5', 0, 46, 3);
INSERT INTO `sys_menu` VALUES (51, '自定义加载', 'loading', 'Loading', 0, 46, 4);
INSERT INTO `sys_menu` VALUES (52, '列表', 'list', 'ListDemo', 0, 46, 5);
INSERT INTO `sys_menu` VALUES (53, '单元格', 'cell', 'CellDemo', 0, 46, 6);
INSERT INTO `sys_menu` VALUES (54, '锚点', 'anchor', 'AnchorDemo', 0, 46, 7);
INSERT INTO `sys_menu` VALUES (55, '图钉', 'affix', 'AffixDemo', 0, 46, 8);
INSERT INTO `sys_menu` VALUES (56, '相对时间', 'time', 'TimeDemo', 0, 46, 9);
INSERT INTO `sys_menu` VALUES (57, '小组件', 'component', 'ComponentMixinDemo', 0, 46, 10);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `role_status` tinyint(6) NULL DEFAULT 0 COMMENT '是否为超级管理员 1 是  0 不是',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `delete_status` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 0 COMMENT '有效性 0无效 1有效',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '管理员', 0, '2019-10-18 11:49:46.016623', '2019-10-18 11:13:36.537165', 1);
INSERT INTO `sys_role` VALUES (2, '专家', 0, '2019-10-18 11:49:49.307813', '2019-10-18 09:45:09.860136', 1);
INSERT INTO `sys_role` VALUES (3, '普通教师', 0, '2019-10-18 11:49:51.397937', '2019-10-18 09:45:09.860136', 0);
INSERT INTO `sys_role` VALUES (5, '1', NULL, '2019-10-18 11:50:44.107160', '2019-10-18 11:50:44.107160', 0);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `id` int(11) NULL DEFAULT NULL COMMENT '菜单id',
  INDEX `f1`(`role_id`) USING BTREE,
  INDEX `f2`(`id`) USING BTREE,
  CONSTRAINT `f1` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `f2` FOREIGN KEY (`id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 26);
INSERT INTO `sys_role_menu` VALUES (1, 21);
INSERT INTO `sys_role_menu` VALUES (1, 1);
INSERT INTO `sys_role_menu` VALUES (1, 28);
INSERT INTO `sys_role_menu` VALUES (1, 27);
INSERT INTO `sys_role_menu` VALUES (1, 29);
INSERT INTO `sys_role_menu` VALUES (1, 30);
INSERT INTO `sys_role_menu` VALUES (1, 41);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int(50) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名称',
  `pwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录密码',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职务',
  `phone_number` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `valid` tinyint(1) NULL DEFAULT NULL COMMENT '有效性 0无效 1有效',
  `user_type` int(11) NULL DEFAULT 0 COMMENT '用户类型 默认0，专家1',
  `unit` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作单位',
  `id_card` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `user_name_unique`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '办公室人员信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 1, 'admin', 'a49145c46e79a7c0906517248a4e21ff', 'admin', '15369846852', 1, 0, NULL, NULL, '2019-10-18 09:43:52.754815', '2019-10-24 15:31:22.186809');
INSERT INTO `sys_user` VALUES (5, 2, '小康', '755c6d261a00ac378d5e3c8d43186ef0', '开发', '13300000000', 1, 1, '汉江信融', '100000000000000007', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (29, 2, '文彬', '7ccab139c3ba410f257bda93279e9db7', '开发', '15300000000', 1, 1, '汉江信融', '100000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (38, 2, '传奇', '1f037f8b7c7cf3ca19462ee9227f7cfb', '开发', '13800000000', 1, 1, '汉江信融', '100000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (40, 2, '小张', '9de19f6def530f37e0d9f40e90a9839e', '专家', '18800000000', 1, 1, '某公司', '100000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (41, 2, '韩梅梅', '6e8642e8d95b1290d84694df3a50952c', '专家', '13700000000', 1, 1, '某公司', '100000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (42, 2, '李磊', '8afdfb6c20148dd18143926fa893d1fb', '专家', '18700000000', 1, 1, '某单位', '100000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (43, 2, '吴一帆', 'ef6311d87a1688534005f85925a47242', '专家', '15500000000', 1, 1, '某部门', '400000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (44, 2, '小明', '11074addbfe022a8a4312bbd6b2c222f', '专家', '13100000000', 1, 1, '某某某', '400000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (45, 2, '晓红', 'a81f8fbe4c640f11c8b49bbd1f3a3e83', '专家', '13300000000', 1, 1, '某某某', '400000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (46, 2, '晓峰', '80d633924a2e936227cc49a546994018', '专家', '13400000000', 1, 1, '测试部门', '400000000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (47, 1, 'yonghu', 'bcc69298e7dc84716e87edf65792d820', '大老板', '42068472169712', 0, 0, NULL, NULL, '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (48, 2, '至尊宝', '01a96603774f746955ac13c00a6acab2', '专家', '16489651200', 1, 1, '大话西游', '420626000000000000', '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (49, 1, 'test', 'bdc90b17c647069d342b90b72cbc6add', '佛祖2', '1536549492', 0, 0, NULL, NULL, '2019-10-18 09:43:52.754815', '2019-10-18 09:44:11.565536');
INSERT INTO `sys_user` VALUES (50, 3, 'xuxiaokang', 'c757731c0a777c23da487c0cb31cba96', '小弟12', '4295979616', 1, 0, NULL, NULL, '2019-10-18 09:43:52.754815', '2019-10-18 10:31:25.086291');
INSERT INTO `sys_user` VALUES (53, 1, '1', '44521817b74edd9ff2afbf291160c931', 'string', 'string', 1, 0, 'string', 'string', '2019-10-18 10:31:36.708293', '2019-10-24 16:26:11.667957');

SET FOREIGN_KEY_CHECKS = 1;
