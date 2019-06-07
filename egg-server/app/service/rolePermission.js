'use strict';
const Service = require('egg').Service;

class RolePermissionService extends Service {
  async findAll(userId) {
    // 1.根据用户id，在admin_user表中查出roleId
    // 2.根据roleId，在role_permission表中查出permissionId
    // 3.根据permissionId==id，在permission表中查出permission
    // 4. 每一层children筛选，都判断是否在permissionId的数组里
    const Op = this.ctx.app.Sequelize.Op;
    const { ctx } = this;
    try {
      // 1
      const adminUserData = await ctx.model.AdminUser.findAll({
        where: {
          id: userId,
        },
      });
      // 2
      const roleId = adminUserData[0].roleId;
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

module.exports = RolePermissionService;
