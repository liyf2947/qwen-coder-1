'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 获取所有用户
  async index() {
    const { ctx } = this;
    try {
      const users = await ctx.service.user.findAll();
      ctx.success(users);
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  // 获取单个用户
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const user = await ctx.service.user.findById(id);
      if (!user) {
        ctx.fail('用户不存在', 404);
        return;
      }
      ctx.success(user);
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  // 创建用户
  async create() {
    const { ctx } = this;
    const { name, email, age } = ctx.request.body;
    try {
      const user = await ctx.service.user.create({ name, email, age });
      ctx.success(user, '创建成功');
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  // 更新用户
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, email, age } = ctx.request.body;
    try {
      const user = await ctx.service.user.update(id, { name, email, age });
      if (!user) {
        ctx.fail('用户不存在', 404);
        return;
      }
      ctx.success(user, '更新成功');
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  // 删除用户
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const result = await ctx.service.user.destroy(id);
      if (!result) {
        ctx.fail('用户不存在', 404);
        return;
      }
      ctx.success(null, '删除成功');
    } catch (error) {
      ctx.fail(error.message);
    }
  }
}

module.exports = UserController;
