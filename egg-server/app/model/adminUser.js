'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const AdminUser = app.model.define(
    'admin_user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
      },
      password: {
        type: STRING,
      },
      avatar: {
        type: STRING,
      },
      phone: {
        type: STRING,
      },
      status: {
        type: INTEGER,
      },
      isAdmin: {
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
      roleId: {
        type: INTEGER,
      },
    },
    {
      freezeTableName: true, // 使用数据库里的真实表名
      underscored: false, // 不使用下划线
    }
  );
  AdminUser.associate = function() {
    app.model.AdminUser.belongsTo(app.model.Role, { as: 'role' });
  };
  return AdminUser;
};
