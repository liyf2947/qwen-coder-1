'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 查询所有用户
  async findAll() {
    const { app } = this;
    const users = await app.mysql.select('users');
    return users;
  }

  // 根据 ID 查询用户
  async findById(id) {
    const { app } = this;
    const user = await app.mysql.get('users', { id: parseInt(id) });
    return user;
  }

  // 创建用户
  async create(data) {
    const { app } = this;
    const result = await app.mysql.insert('users', data);
    return await this.findById(result.insertId);
  }

  // 更新用户
  async update(id, data) {
    const { app } = this;
    await app.mysql.update('users', { id: parseInt(id) }, data);
    return await this.findById(id);
  }

  // 删除用户
  async destroy(id) {
    const { app } = this;
    const result = await app.mysql.delete('users', { id: parseInt(id) });
    return result.affectedRows > 0;
  }
}

module.exports = UserService;
