'use strict';

module.exports = () => {
  return async function responseHandler(ctx, next) {
    // 扩展 ctx.success 和 ctx.fail 方法
    ctx.success = (data = null, message = 'success') => {
      ctx.body = {
        code: 0,
        message,
        data,
      };
      ctx.status = 200;
    };

    ctx.fail = (message = 'error', status = 400) => {
      ctx.body = {
        code: status,
        message,
        data: null,
      };
      ctx.status = status;
    };

    await next();
  };
};
