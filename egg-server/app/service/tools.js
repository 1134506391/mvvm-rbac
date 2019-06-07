'use strict';
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const Service = require('egg').Service;

class ToolsService extends Service {
  async getUploadFile(filename) {
    // 1、获取当前日期     20180920
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 2、创建图片保存的路径
    const dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);
    let d = new Date();
    d = d.getTime(); /* 毫秒数*/
    // 返回图片保存的路径
    const uploadDir = path.join(dir, d + path.extname(filename));
    // app\public\admin\upload\20180914\1536895331444.png
    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }
}

module.exports = ToolsService;
