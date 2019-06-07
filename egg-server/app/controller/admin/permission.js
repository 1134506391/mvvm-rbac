'use strict';

const Controller = require('egg').Controller;

class PermissionController extends Controller {
  async routes() {
    const { ctx } = this;
    const result = await ctx.service.permission.routes();
    ctx.body = result;
  }
  async findAll() {
    const { ctx } = this;
    const result = await ctx.service.permission.findAll();
    ctx.body = result;
  }
  async findAllByCreate() {
    const { ctx } = this;
    const result = await ctx.service.permission.findAllByCreate();
    ctx.body = result;
  }
  async create() {
    const { ctx } = this;
    const newPermission = await ctx.request.body;
    const result = await ctx.service.permission.create(newPermission);
    ctx.body = result;
  }
}

module.exports = PermissionController;
