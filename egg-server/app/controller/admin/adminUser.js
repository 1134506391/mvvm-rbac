'use strict';
const fs = require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class AdminUserController extends Controller {
  // 查找所有管理员
  async findAll() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.adminUser.findAll(query);
    ctx.body = result;
  }
  // 查找单个管理员
  async findOne() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.adminUser.findOne(id);
    ctx.body = result;
  }
  // 创建管理员
  async create() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await ctx.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);
      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    const newAdminUser = Object.assign(files, JSON.parse(parts.field.data));
    const result = await ctx.service.adminUser.create(newAdminUser);
    ctx.body = result;
  }
  // 修改管理员
  async update() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await ctx.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);
      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    const newAdminUser = Object.assign(files, JSON.parse(parts.field.data));
    const result = await ctx.service.adminUser.update(newAdminUser);
    ctx.body = result;
  }
  // 删除管理员
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.adminUser.destroy(id);
    ctx.body = result;
  }
}

module.exports = AdminUserController;
