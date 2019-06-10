'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async findAll() {
    const { ctx } = this;
    const result = await ctx.service.role.findAll();
    ctx.body = result;
  }
  async findOne() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.role.findOne(id);
    ctx.body = result;
  }
  async create() {
    const { ctx } = this;
    const newRole = await ctx.request.body;
    const result = await ctx.service.role.create(newRole);
    ctx.body = result;
  }
  async update() {
    const { ctx } = this;
    const newRole = await ctx.request.body;
    const result = await ctx.service.role.update(newRole);
    ctx.body = result;
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.role.destroy(id);
    ctx.body = result;
  }
  async auth() {
    const { ctx } = this;
    const body = await ctx.request.body;

    const result = await ctx.service.role.auth(body);
    ctx.body = result;
  }
  async roleAuth() {
    const { ctx } = this;
    const roleId = ctx.helper.parseInt(ctx.query.roleId);
    console.log('roleIdroleId');
    console.log(roleId);
    const result = await ctx.service.role.roleAuth(roleId);
    ctx.body = result;
  }
}

module.exports = RoleController;
