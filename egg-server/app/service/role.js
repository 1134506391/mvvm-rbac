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

  async roleAuth(roleId) {
    // 1.根据用户id，在admin_user表中查出roleId
    // 2.根据roleId，在role_permission表中查出permissionId
    // 3.根据permissionId==id，在permission表中查出permission
    // 4. 每一层children筛选，都判断是否在permissionId的数组里
    const Op = this.ctx.app.Sequelize.Op;
    const { ctx } = this;
    try {
      // 1
      console.log('roleId');
      console.log(roleId);
      const permissionIdObj = await ctx.model.RolePermission.findAll({
        where: {
          roleId,
        },
        attributes: [ 'permissionId' ],
      });
      const permissionIdArr = [];
      permissionIdObj.forEach(item => {
        permissionIdArr.push(item.permissionId);
      });
      console.log(permissionIdArr);
      // 3,4
      const permissionArr = await ctx.model.Permission.findAll({
        where: {
          permissionId: 0,
          id: {
            [Op.in]: permissionIdArr,
          },
        },
        include: [
          {
            model: this.ctx.model.Permission,
            as: 'children',
            where: {
              id: {
                [Op.in]: permissionIdArr,
              },
            },
            include: [
              {
                model: this.ctx.model.Permission,
                as: 'children',
                where: {
                  id: {
                    [Op.in]: permissionIdArr,
                  },
                },
              },
            ],
          },
        ],
      });
      ctx.status = 200;
      return {
        ok: true,
        msg: '根据管理员id查询路由权限数据成功',
        data: permissionArr,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = RoleService;
