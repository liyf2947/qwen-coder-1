'use strict';

module.exports = app => {
  const exports = {};

  // 安全配置
  exports.security = {
    csrf: {
      enable: false, // 开发环境关闭 CSRF
    },
  };

  // CORS 跨域配置
  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // MySQL 数据库配置
  exports.mysql = {
    client: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'simple_system',
    },
    app: true,
  };

  // 自定义中间件 - 统一响应格式
  exports.middleware = [ 'responseHandler' ];

  return exports;
};
