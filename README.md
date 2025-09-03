# 玄鉴 (XUAN JIAN)

基于 LibreChat 的高级 AI 聊天应用平台，支持多种 AI 模型、实时对话、文件处理和多语言本地化。

## ✨ 特性

- 🤖 **多模型支持** - 支持 OpenAI、Claude、Google、百度等主流 AI 模型
- 💬 **实时对话** - 流式响应、多轮对话、对话分支
- 📁 **智能文件处理** - 支持文档上传、图片识别、文件搜索
- 🎨 **自定义界面** - 主题切换、响应式设计、无障碍支持
- 🌐 **多语言支持** - 内置 20+ 种语言本地化
- 👥 **用户管理** - 注册登录、角色权限、余额管理
- 🔐 **安全认证** - JWT 令牌、社交登录、LDAP 集成
- 🚀 **高性能架构** - MongoDB 数据库、Redis 缓存、Docker 部署

## 📋 系统要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 或 **Bun** >= 1.0.0
- **MongoDB** >= 5.0
- **Docker** & **Docker Compose** (可选)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd xuanjian
```

### 2. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

**必需的环境变量：**
```env
HOST=localhost
PORT=3080
MONGO_URI=mongodb://127.0.0.1:27017/LibreChat
DOMAIN_CLIENT=http://localhost:3080
DOMAIN_SERVER=http://localhost:3080

# 添加你的 AI 模型 API 密钥
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### 3. 安装依赖

```bash
# 使用 npm (推荐)
npm install

# 或使用 bun (更快)
bun install
```

### 4. 启动服务

#### 开发模式
```bash
# 启动后端开发服务器
npm run backend:dev

# 启动前端开发服务器 (新终端)
npm run frontend:dev
```

#### Docker 部署
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 5. 访问应用

打开浏览器访问：`http://localhost:3080`

## 🛠️ 开发指南

### 项目结构

```
xuanjian/
├── api/                    # Express.js 后端
│   ├── server/            # 服务器核心代码
│   ├── models/            # MongoDB 数据模型
│   ├── controllers/       # 控制器逻辑
│   └── routes/            # API 路由定义
├── client/                # React 前端应用
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── hooks/         # 自定义 hooks
│   │   ├── locales/       # 多语言文件
│   │   └── routes/        # 路由配置
│   └── public/            # 静态资源
├── packages/              # 共享包
│   ├── data-schemas/      # 数据模式定义
│   ├── api/              # API 工具包
│   ├── client/           # 客户端组件库
│   └── data-provider/    # 数据提供者
└── config/               # 配置文件
```

### 常用命令

**开发服务器：**
```bash
npm run backend:dev         # 后端开发服务器
npm run frontend:dev        # 前端开发服务器
```

**构建项目：**
```bash
npm run frontend           # 构建生产版本
npm run build:api          # 构建 API 包
npm run build:client-package # 构建客户端包
```

**测试：**
```bash
npm run test:client        # 客户端测试
npm run test:api          # API 测试
npm run e2e               # 端到端测试
npm run e2e:headed        # 带界面的 E2E 测试
```

**代码质量：**
```bash
npm run lint              # 代码检查
npm run lint:fix          # 自动修复
npm run format            # 代码格式化
```

**用户管理：**
```bash
npm run create-user       # 创建用户
npm run list-users        # 列出用户
npm run add-balance       # 添加余额
npm run ban-user          # 封禁用户
```

### 技术栈

**后端：**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT 认证
- Socket.IO 实时通信
- Passport.js 社交登录

**前端：**
- React 18 + Vite
- TypeScript
- Tailwind CSS + Radix UI
- Recoil 状态管理
- React Query 数据获取
- React Router 路由

**工具：**
- ESLint + Prettier 代码规范
- Jest + Playwright 测试
- Docker + Docker Compose 部署
- Husky Git 钩子

## 🔧 配置说明

### librechat.yaml 配置

主要配置文件 `librechat.yaml` 包含：

```yaml
version: "1.0"
cache: true

interface:
  customWelcome: '欢迎使用玄鉴！'
  fileSearch: true
  endpointsMenu: true
  modelSelect: true
  parameters: true
  sidePanel: true

registration:
  socialLogins: ['github', 'google', 'discord']
```

### 文件存储配置

支持多种存储策略：
- **local** - 本地文件系统
- **s3** - Amazon S3 兼容存储
- **firebase** - Google Firebase Storage

### 部署配置

**生产部署命令：**
```bash
npm run start:deployed     # 启动部署版本
npm run stop:deployed      # 停止部署版本
npm run update:deployed    # 更新部署版本
```

## 🔐 安全配置

### 环境变量安全

确保以下敏感信息仅在环境变量中配置：
- API 密钥
- 数据库连接字符串
- JWT 密钥
- 第三方服务凭证

### 社交登录配置

支持的登录方式：
- GitHub OAuth
- Google OAuth
- Discord OAuth
- Facebook Login
- Apple ID
- OpenID Connect
- SAML

## 📖 API 文档

### 主要 API 端点

```bash
# 用户认证
POST /api/auth/login        # 用户登录
POST /api/auth/register     # 用户注册
POST /api/auth/logout       # 用户退出

# 对话管理
GET  /api/conversations     # 获取对话列表
POST /api/conversations     # 创建新对话
PUT  /api/conversations/:id # 更新对话
DELETE /api/conversations/:id # 删除对话

# 消息处理
POST /api/messages         # 发送消息
GET  /api/messages/:id     # 获取消息详情

# 文件处理
POST /api/files/upload     # 上传文件
GET  /api/files/:id        # 获取文件信息
DELETE /api/files/:id      # 删除文件
```

## 🐛 故障排除

### 常见问题

**1. 依赖安装失败**
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
```

**2. 数据库连接失败**
- 确认 MongoDB 服务运行
- 检查 `MONGO_URI` 环境变量
- 验证数据库权限

**3. 构建失败**
```bash
# 按顺序构建包
npm run build:data-provider
npm run build:data-schemas
npm run build:api
npm run build:client-package
```

**4. 端口冲突**
```bash
# 更改端口号
export PORT=3081
npm run backend:dev
```

### 日志查看

```bash
# Docker 日志
docker-compose logs -f api
docker-compose logs -f mongodb

# 应用日志
tail -f logs/error.log
tail -f logs/access.log
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 ESLint 和 Prettier 配置
- 编写单元测试
- 更新相关文档
- 保持提交信息清晰

## 📜 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [LibreChat](https://github.com/danny-avila/LibreChat) - 基础框架
- 所有开源贡献者
- AI 模型提供商

## 📞 支持

- **GitHub Issues**: [提交问题](https://github.com/your-repo/issues)
- **讨论区**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **官方网站**: [https://librechat.ai/](https://librechat.ai/)

---

**玄鉴 - 让 AI 对话更智能、更便捷** 🚀