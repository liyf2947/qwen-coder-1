const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接池配置
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'simple_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功！');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    console.log('请确保 MySQL 已启动并执行了 database/init.sql 脚本');
    return false;
  }
}

// API 路由：获取所有用户
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('查询用户失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// API 路由：创建用户
app.post('/api/users', async (req, res) => {
  const { username, email } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({ message: '用户名和邮箱不能为空' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    
    const [newUser] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error('创建用户失败:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: '该邮箱已存在' });
    } else {
      res.status(500).json({ message: '服务器内部错误' });
    }
  }
});

// API 路由：删除用户
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除用户失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 健康检查接口
app.get('/api/health', async (req, res) => {
  const connected = await testConnection();
  res.json({ 
    status: 'ok', 
    database: connected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
async function startServer() {
  const connected = await testConnection();
  
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 API 端点：http://localhost:${PORT}/api`);
    if (!connected) {
      console.log('⚠️  数据库未连接，部分功能可能不可用');
    }
  });
}

startServer();
