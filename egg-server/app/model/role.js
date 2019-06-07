'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Role = app.model.define(
    'role',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING,
      },
      description: {
        type: STRING,
      },
      status: {
        type: INTEGER,
      },
      createdAt: {
        type: DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
      updatedAt: {
        type: DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
    },
    {
      freezeTableName: true, // 使用数据库里的真实表名
      underscored: false, // 不使用下划线
    }
  );
  Role.associate = function() {
    app.model.Role.hasMany(app.model.AdminUser, { as: 'adminUser' });
  };
  return Role;
};
