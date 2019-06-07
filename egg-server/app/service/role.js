'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async findAll() {
    const { ctx } = this;
    try {
      const result = await ctx.model.Role.findAll({
        include: [
          {
            model: this.ctx.model.AdminUser,
            as: 'adminUser',
          },
        ],
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询角色和用户数据成功',
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
      const result = await ctx.model.Role.findAll({
        where: {
          id,
        },
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '查询角色和用户数据成功',
        data: result[0],
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async create(role) {
    const { ctx } = this;
    try {
      await ctx.model.Role.create(role);
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
  async update(newRole) {
    const { ctx } = this;
    try {
      const id = newRole.id;
      const role = await ctx.model.Role.findAll({
        where: {
          id,
        },
      });
      if (!role) {
        ctx.status = 500;
        return {
          ok: false,
          msg: '根据id，没有查询到这个角色',
        };
      }
      await role[0].update(newRole);
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
      const role = await ctx.model.Role.findAll({
        where: {
          id,
        },
      });
      if (!role) {
        ctx.status = 500;
        return {
          ok: false,
          msg: '根据id，没有查询到这个角色',
        };
      }
      await role[0].destroy();
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
  async auth(body) {
    const { ctx } = this;
    try {
      // 1.删除roleId下的所有数据
      // 2.根据roleId增加数据
      const roleId = body.roleId;
      const data = body.data;
      await ctx.model.RolePermission.destroy({
        where: {
          roleId,
        },
      });
      data.forEach(async item => {
        await ctx.model.RolePermission.create({
          roleId,
          permissionId: item.id,
        });
      });
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

module.exports = RoleService;
