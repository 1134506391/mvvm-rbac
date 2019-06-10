'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登录退出
  router.post('/api/login', controller.admin.login.login);
  router.post('/api/logout', controller.admin.login.logout);
  // 权限
  router.get('/api/permission/routes', controller.admin.permission.routes);
  router.get('/api/permission', controller.admin.permission.findAll);
  router.get(
    '/api/permissionByCreate',
    controller.admin.permission.findAllByCreate
  );
  router.post('/api/permission', controller.admin.permission.create);

  // 角色
  router.get('/api/role', controller.admin.role.findAll);
  router.get('/api/role/:id', controller.admin.role.findOne);
  router.post('/api/role', controller.admin.role.create);
  router.delete('/api/role/:id', controller.admin.role.destroy);
  router.put('/api/role', controller.admin.role.update);
  router.post('/api/auth', controller.admin.role.auth);
  router.get('/api/roleAuth', controller.admin.role.roleAuth);
  // 管理员
  router.get('/api/adminUser', controller.admin.adminUser.findAll);
  router.get('/api/adminUser/:id', controller.admin.adminUser.findOne);
  router.post('/api/adminUser', controller.admin.adminUser.create);
  router.delete('/api/adminUser/:id', controller.admin.adminUser.destroy);
  router.put('/api/adminUser', controller.admin.adminUser.update);
  // 角色权限
  router.get('/api/rolePermission', controller.admin.rolePermission.findAll);
};
