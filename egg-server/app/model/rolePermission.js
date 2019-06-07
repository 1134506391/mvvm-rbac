'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const RolePermission = app.model.define(
    'role_permission',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleId: {
        type: INTEGER,
      },
      permissionId: {
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
  RolePermission.associate = function() {
    app.model.RolePermission.belongsTo(app.model.Role, { as: 'role' });
    app.model.RolePermission.belongsTo(app.model.Permission, {
      as: 'permission',
    });
  };
  return RolePermission;
};
