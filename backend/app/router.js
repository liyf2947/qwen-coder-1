'use strict';

module.exports = app => {
  const { router, controller } = app;
  
  // 获取所有用户
  router.get('/api/users', controller.user.index);
  
  // 获取单个用户
  router.get('/api/users/:id', controller.user.show);
  
  // 创建用户
  router.post('/api/users', controller.user.create);
  
  // 更新用户
  router.put('/api/users/:id', controller.user.update);
  
  // 删除用户
  router.delete('/api/users/:id', controller.user.destroy);
};
