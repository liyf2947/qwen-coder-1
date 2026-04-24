# 简单前后端分离系统

一套在中国常用的最简单的前后端分离系统，包含完整的前端、后端和数据库代码。

## 📁 项目结构

```
/workspace
├── frontend/           # 前端代码
│   └── index.html     # 单页面应用（HTML + CSS + JavaScript）
├── backend/           # 后端代码
│   ├── package.json   # Node.js 依赖配置
│   ├── server.js      # Express 服务器
│   └── .env.example   # 环境变量示例
└── database/          # 数据库脚本
    └── init.sql       # MySQL 初始化脚本
```

## 🚀 快速开始

### 1. 数据库设置

确保已安装 MySQL，然后执行以下步骤：

```bash
# 登录 MySQL
mysql -u root -p

# 执行初始化脚本
source /workspace/database/init.sql
```

或者使用命令行直接执行：
```bash
mysql -u root -p < /workspace/database/init.sql
```

### 2. 后端启动

```bash
# 进入后端目录
cd /workspace/backend

# 复制环境变量文件
cp .env.example .env

# 安装依赖
npm install

# 启动服务器
npm start
```

后端服务将运行在：http://localhost:3000

### 3. 前端使用

直接用浏览器打开 `/workspace/frontend/index.html` 文件即可。

或者使用简单的 HTTP 服务器：

```bash
# 使用 Python 启动静态服务器
cd /workspace/frontend
python3 -m http.server 8080
```

然后访问：http://localhost:8080

## 🔧 技术栈

### 前端
- 原生 HTML5 + CSS3 + JavaScript (ES6+)
- Fetch API 进行异步请求
- 响应式设计，支持移动端

### 后端
- Node.js
- Express.js (Web 框架)
- MySQL2 (数据库驱动)
- CORS (跨域支持)

### 数据库
- MySQL 8.0+
- UTF8MB4 字符集（支持中文）

## 📡 API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/users | 获取所有用户 |
| POST | /api/users | 创建新用户 |
| DELETE | /api/users/:id | 删除指定用户 |
| GET | /api/health | 健康检查 |

## ⚙️ 配置说明

编辑 `backend/.env` 文件修改配置：

```env
DB_HOST=localhost      # 数据库主机
DB_PORT=3306          # 数据库端口
DB_USER=root          # 数据库用户名
DB_PASSWORD=root      # 数据库密码
DB_NAME=simple_system # 数据库名称
PORT=3000            # 服务器端口
```

## 🎯 功能特点

- ✅ 用户列表展示
- ✅ 添加新用户
- ✅ 实时数据同步
- ✅ 表单验证
- ✅ 错误处理
- ✅ 美观的 UI 界面
- ✅ 支持中文

## 🛠️ 开发建议

1. **生产环境**：请修改默认数据库密码
2. **安全性**：添加身份验证和授权机制
3. **性能优化**：使用前端框架（Vue/React）提升体验
4. **部署**：使用 Nginx 反向代理和 PM2 进程管理

## 📝 注意事项

1. 确保 MySQL 服务已启动
2. 确保后端端口 3000 未被占用
3. 前端需要访问后端 API，注意跨域问题（已配置 CORS）
4. 数据库字符集设置为 utf8mb4 以支持中文

## 🐛 常见问题

**Q: 数据库连接失败？**
A: 检查 MySQL 是否启动，确认 .env 文件中的数据库配置是否正确。

**Q: 前端无法访问后端 API？**
A: 确保后端服务已启动，检查浏览器控制台是否有 CORS 错误。

**Q: 中文显示乱码？**
A: 确保数据库使用 utf8mb4 字符集，HTML 文件设置了正确的 charset。

---

**作者**: AI Assistant  
**日期**: 2024  
**许可证**: MIT
