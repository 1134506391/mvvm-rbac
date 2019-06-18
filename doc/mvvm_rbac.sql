/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : mvvm_rbac

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-06-18 11:18:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `username` varchar(255) DEFAULT NULL COMMENT '管理员名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `isAdmin` int(1) DEFAULT '1' COMMENT '0:超级管理员,1:普通管理员',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('2', 'admin', '123456', '/public/admin/upload/20190602/1559472929530.jpg', '18688647881', '1', '1', '2019-06-02 18:54:19', '2019-06-02 18:55:29', '2');
INSERT INTO `admin_user` VALUES ('3', 'bdmin', '123456', '/public/admin/upload/20190607/1559870348809.jpg', '18688647881', '1', '1', '2019-06-07 09:19:08', '2019-06-07 09:19:08', '5');
INSERT INTO `admin_user` VALUES ('4', 'cdmin', '123456', '/public/admin/upload/20190607/1559870377377.jpg', '18688647882', '1', '1', '2019-06-07 09:19:37', '2019-06-07 09:19:37', '6');
INSERT INTO `admin_user` VALUES ('5', 'ddmin', '123456', '/public/admin/upload/20190607/1559870395429.jpg', '18688647883', '1', '1', '2019-06-07 09:19:55', '2019-06-07 09:19:55', '7');
INSERT INTO `admin_user` VALUES ('6', '路飞同学', '123456', '/public/admin/upload/20190607/1559897765100.jpg', '18688640000', '1', '1', '2019-06-07 16:56:05', '2019-06-07 16:56:05', '7');
INSERT INTO `admin_user` VALUES ('7', 'edmin', '123456', '/public/admin/upload/20190607/1559919431246.jpg', '18688647003', '1', '1', '2019-06-07 22:57:11', '2019-06-07 22:57:11', '7');

-- ----------------------------
-- Table structure for form
-- ----------------------------
DROP TABLE IF EXISTS `form`;
CREATE TABLE `form` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表单id',
  `check` varchar(255) DEFAULT 'false' COMMENT '是否选中',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='表单表';

-- ----------------------------
-- Records of form
-- ----------------------------
INSERT INTO `form` VALUES ('1', '1', '2019-06-08 13:04:42', '2019-06-08 13:04:42', 'a');
INSERT INTO `form` VALUES ('2', '1', '2019-06-08 13:05:42', '2019-06-08 13:05:42', 's');
INSERT INTO `form` VALUES ('3', '0', '2019-06-08 13:06:19', '2019-06-08 13:06:19', 'd');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '路由id',
  `type` int(1) DEFAULT '1' COMMENT '节点类型,1:表示模块 2:表示菜单3:操作',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `name` varchar(255) DEFAULT NULL COMMENT '路由名',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `permissionId` int(11) DEFAULT NULL COMMENT '自关联id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COMMENT='路由表';

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '1', '首页', 'home', '1', '2019-06-04 14:55:02', '2019-06-04 14:55:02', '0');
INSERT INTO `permission` VALUES ('3', '1', '角色', 'role', '1', '2019-06-04 15:11:36', '2019-06-04 15:11:36', '1');
INSERT INTO `permission` VALUES ('5', '2', '角色列表', 'roleList', '1', '2019-06-04 15:12:10', '2019-06-04 15:12:10', '3');
INSERT INTO `permission` VALUES ('6', '3', '角色修改', 'roleUpdate', '1', '2019-06-04 15:12:29', '2019-06-04 15:12:29', '3');
INSERT INTO `permission` VALUES ('7', '1', '管理员', 'adminUser', '1', '2019-06-04 15:12:57', '2019-06-04 15:12:57', '1');
INSERT INTO `permission` VALUES ('8', '2', '管理员创建', 'adminUserCreate', '1', '2019-06-04 15:13:05', '2019-06-04 15:13:05', '7');
INSERT INTO `permission` VALUES ('9', '2', '管理员列表', 'adminUserList', '1', '2019-06-04 15:13:25', '2019-06-04 15:13:25', '7');
INSERT INTO `permission` VALUES ('10', '3', '管理员修改', 'adminUserUpdate', '1', '2019-06-04 15:13:32', '2019-06-04 15:13:32', '7');
INSERT INTO `permission` VALUES ('11', '1', '权限', 'permission', '1', '2019-06-04 15:13:40', '2019-06-04 15:13:40', '1');
INSERT INTO `permission` VALUES ('12', '2', '权限创建', 'permissionCreate', '1', '2019-06-04 15:13:59', '2019-06-04 15:13:59', '11');
INSERT INTO `permission` VALUES ('13', '2', '权限列表', 'permissionList', '1', '2019-06-04 15:14:10', '2019-06-04 15:14:10', '11');
INSERT INTO `permission` VALUES ('14', '3', '权限修改', 'permissionUpdate', '1', '2019-06-04 15:14:17', '2019-06-04 15:14:17', '11');
INSERT INTO `permission` VALUES ('15', '3', '角色创建', 'roleCreate', '1', '2019-06-05 22:29:28', '2019-06-05 22:29:28', '3');
INSERT INTO `permission` VALUES ('16', '3', '角色授权', 'roleAuth', '1', '2019-06-05 22:59:46', '2019-06-05 22:59:46', '3');
INSERT INTO `permission` VALUES ('18', '3', '管理员删除', 'adminUserDelete', '1', '2019-06-10 13:52:06', '2019-06-10 13:52:06', '7');
INSERT INTO `permission` VALUES ('20', '3', '路由权限删除', 'permissionDelete', '1', '2019-06-10 14:03:55', '2019-06-10 14:03:55', '11');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `title` varchar(255) DEFAULT NULL COMMENT '角色标题',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2', '超级管理员', '超级管理员', '1', '2019-06-02 18:49:47', '2019-06-02 18:50:40');
INSERT INTO `role` VALUES ('5', '校长', '校长校长', '1', '2019-06-07 09:13:07', '2019-06-07 09:13:07');
INSERT INTO `role` VALUES ('6', '老师', '老师老师', '1', '2019-06-07 09:13:17', '2019-06-07 09:13:17');
INSERT INTO `role` VALUES ('7', '学生', '学生学生', '1', '2019-06-07 09:13:29', '2019-06-07 09:13:29');

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `roleId` int(11) DEFAULT NULL COMMENT '角色id',
  `permissionId` int(11) DEFAULT NULL COMMENT '权限id',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=559 DEFAULT CHARSET=utf8mb4 COMMENT='角色权限多对多';

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES ('482', '2', '1', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('483', '2', '3', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('484', '2', '5', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('485', '2', '6', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('486', '2', '15', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('487', '2', '16', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('488', '2', '7', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('489', '2', '8', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('490', '2', '9', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('491', '2', '10', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('492', '2', '18', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('493', '2', '11', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('494', '2', '12', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('495', '2', '13', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('496', '2', '14', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('497', '2', '20', '2019-06-18 10:41:53', '2019-06-18 10:41:53');
INSERT INTO `role_permission` VALUES ('544', '5', '1', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('545', '5', '7', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('546', '5', '8', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('547', '5', '9', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('548', '5', '10', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('549', '5', '18', '2019-06-18 10:45:15', '2019-06-18 10:45:15');
INSERT INTO `role_permission` VALUES ('550', '6', '1', '2019-06-18 10:45:23', '2019-06-18 10:45:23');
INSERT INTO `role_permission` VALUES ('551', '6', '7', '2019-06-18 10:45:23', '2019-06-18 10:45:23');
INSERT INTO `role_permission` VALUES ('552', '6', '8', '2019-06-18 10:45:23', '2019-06-18 10:45:23');
INSERT INTO `role_permission` VALUES ('553', '6', '9', '2019-06-18 10:45:23', '2019-06-18 10:45:23');
INSERT INTO `role_permission` VALUES ('554', '6', '10', '2019-06-18 10:45:23', '2019-06-18 10:45:23');
INSERT INTO `role_permission` VALUES ('555', '7', '1', '2019-06-18 10:45:29', '2019-06-18 10:45:29');
INSERT INTO `role_permission` VALUES ('556', '7', '7', '2019-06-18 10:45:29', '2019-06-18 10:45:29');
INSERT INTO `role_permission` VALUES ('557', '7', '8', '2019-06-18 10:45:29', '2019-06-18 10:45:29');
INSERT INTO `role_permission` VALUES ('558', '7', '9', '2019-06-18 10:45:29', '2019-06-18 10:45:29');
