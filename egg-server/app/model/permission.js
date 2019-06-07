'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Permission = app.model.define(
    'permission',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: INTEGER,
      },
      name: {
        type: STRING,
      },
      title: {
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
      permissionId: {
        type: INTEGER,
      },
    },
    {
      freezeTableName: true, // 使用数据库里的真实表名
      underscored: false, // 不使用下划线
    }
  );
  Permission.associate = function() {
    app.model.Permission.hasMany(app.model.Permission, {
      as: 'children',
      // foreignKey: 'permissionId',
    });
  };
  return Permission;
};
