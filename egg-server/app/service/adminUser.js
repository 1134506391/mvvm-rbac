'use strict';

const Service = require('egg').Service;

class AdminUserService extends Service {
  async findAll(query) {
    const { ctx } = this;
    try {
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.AdminUser.findAndCountAll({
        offset,
        limit,
        include: [
          {
            model: this.ctx.model.Role,
            as: 'role',
          },
        ],
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询用户数据成功',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async findOne(id) {
    const { ctx } = this;
    try {
      const result = await ctx.model.AdminUser.findAll({
        where: {
          id,
        },
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询用户数据成功',
        data: result[0],
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async create(newAdminUser) {
    const { ctx } = this;
    try {
      await ctx.model.AdminUser.create(newAdminUser);
      ctx.status = 200;
      return {
        ok: true,
        msg: '修改成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async update(newAdminUser) {
    const { ctx } = this;
    try {
      const id = newAdminUser.id;
      const adminUser = await ctx.model.AdminUser.findAll({
        where: {
          id,
        },
      });
      if (!adminUser) {
        ctx.status = 500;
        return {
          ok: false,
          msg: '根据id，没有查询到这个角色',
        };
      }
      await adminUser[0].update(newAdminUser);
      ctx.status = 200;
      return {
        ok: true,
        msg: '修改成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async destroy(id) {
    const { ctx } = this;
    try {
      const adminUser = await ctx.model.AdminUser.findAll({
        where: {
          id,
        },
      });
      if (!adminUser) {
        ctx.status = 500;
        return {
          ok: false,
          msg: '根据id，没有查询到这个角色',
        };
      }
      await adminUser[0].destroy();
      ctx.status = 200;
      return {
        ok: true,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = AdminUserService;
