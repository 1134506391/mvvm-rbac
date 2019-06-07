'use strict';

const Controller = require('egg').Controller;

class RolePermissionController extends Controller {
  async findAll() {
    const { ctx } = this;
    console.log(ctx.request.query);
    const userId = ctx.helper.parseInt(ctx.request.query.userId);
    const result = await ctx.service.rolePermission.findAll(userId);
    ctx.body = result;
  }
}

module.exports = RolePermissionController;
