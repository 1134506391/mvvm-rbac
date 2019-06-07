'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
  async routes() {
    const { ctx } = this;
    const routes = [
      {
        name: 'home',
        children: [
          {
            name: 'role',
            children: [
              // {
              //   name: 'roleCreate',
              // },
              {
                name: 'roleList',
              },
              {
                name: 'roleUpdate',
              },
            ],
          },
          {
            name: 'adminUser',
            children: [
              {
                name: 'adminUserCreate',
              },
              {
                name: 'adminUserList',
              },
              {
                name: 'adminUserUpdate',
              },
            ],
          },
        ],
      },
    ];
    ctx.status = 200;
    return {
      ok: true,
      msg: '允许的路由',
      data: routes,
    };
  }
  async findAll() {
    const { ctx } = this;
    try {
      const result = await ctx.model.Permission.findAll({
        where: {
          permissionId: 0,
        },
        // attributes: [ 'id', 'name', 'type', 'permissionId' ],
        include: [
          {
            model: this.ctx.model.Permission,
            as: 'children',
            // attributes: [ 'id', 'name', 'type', 'permissionId' ],
            include: [
              {
                model: this.ctx.model.Permission,
                as: 'children',
                // attributes: [ 'id', 'name', 'type', 'permissionId' ],
              },
            ],
          },
        ],
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询路由数据成功1',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async findAllByCreate() {
    const { ctx } = this;
    try {
      const result = await ctx.model.Permission.findAll({});
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询路由数据成功1',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async create(permission) {
    const { ctx } = this;
    try {
      await ctx.model.Permission.create(permission);
      ctx.status = 200;
      return {
        ok: true,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = PermissionService;
