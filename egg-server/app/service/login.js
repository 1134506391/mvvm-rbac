'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login(body) {
    try {
      const { ctx } = this;
      const adminUser = await ctx.model.AdminUser.findAll({
        where: {
          username: body.username,
        },
      });
      if (!adminUser) {
        ctx.status = 400;
        return {
          ok: false,
          msg: '用户名不存在',
        };
      }
      if (body.password === adminUser[0].password) {
        ctx.status = 200;
        return {
          ok: true,
          msg: '账号密码正确',
          data: {
            id: adminUser[0].id,
            username: adminUser[0].username,
            avatar: adminUser[0].avatar,
          },
        };
      }
      ctx.status = 400;
      return {
        ok: false,
        msg: '账号密码错误',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async logout() {
    try {
      const { ctx } = this;
      ctx.status = 200;
      return {
        ok: true,
        msg: '退出成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = LoginService;
