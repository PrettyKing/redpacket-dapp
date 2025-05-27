# 🧧 红包DApp

基于以太坊的去中心化红包应用，使用现代Web3技术栈构建。

## ✨ 特性

- 🎨 **现代化UI** - 使用RainbowKit提供流畅的钱包连接体验
- ⚡ **强大的Web3集成** - 基于Wagmi和Viem构建
- 💰 **灵活的红包类型** - 支持等额和随机红包
- 🔄 **实时数据更新** - 自动同步链上状态
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🛡️ **安全可靠** - 智能合约经过充分测试

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 yarn
- MetaMask 或其他Web3钱包

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/PrettyKing/redpacket-dapp.git
cd redpacket-dapp

# 安装依赖
npm install

# 安装合约依赖
cd hardhat
npm install
cd ..
```

### 环境配置

1. 复制环境变量文件：
```bash
cp .env.example .env
```

2. 配置你的API密钥：
```env
REACT_APP_ALCHEMY_ID=your_alchemy_api_key
REACT_APP_PROJECT_ID=your_walletconnect_project_id
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:3000` 启动。

## 📋 合约部署

### 1. 配置Hardhat环境

```bash
cd hardhat
cp .env.example .env
```

编辑 `hardhat/.env` 文件：
```env
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. 编译合约

```bash
cd hardhat
npm run compile
```

### 3. 运行测试

```bash
npm run test
```

### 4. 部署到测试网

```bash
# 部署到Sepolia测试网
npm run deploy:sepolia

# 部署到Goerli测试网
npm run deploy:goerli
```

### 5. 更新合约地址

部署成功后，将合约地址更新到 `src/contracts/abi.js` 中的 `CONTRACT_ADDRESS`。

## 🏗️ 项目结构

```
redpacket-dapp/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── WalletConnect.jsx
│   │   ├── CreateRedPacket.jsx
│   │   ├── RedPacketInfo.jsx
│   │   └── RedPacketApp.jsx
│   ├── contracts/          # 合约ABI和地址
│   │   └── abi.js
│   ├── hooks/              # 自定义Hooks
│   │   └── useRedPacket.js
│   ├── App.js              # 主应用组件
│   └── index.js            # 应用入口
├── hardhat/                # 智能合约开发环境
│   ├── contracts/          # 合约源码
│   ├── scripts/            # 部署脚本
│   ├── test/               # 合约测试
│   └── hardhat.config.js   # Hardhat配置
└── README.md
```

## 🎯 核心功能

### 智能合约特性

- ✅ **独立初始化函数** - 将构造函数逻辑分离为独立函数
- ✅ **防重入保护** - 安全的资金转移机制
- ✅ **事件日志** - 完整的操作记录
- ✅ **状态查询** - 丰富的合约状态查询接口

### 前端特性

- 🎨 **RainbowKit集成** - 支持多种钱包连接
- ⚡ **Wagmi Hooks** - 简化的合约交互
- 🎭 **美观UI** - 渐变背景和动效
- 📊 **实时状态** - 自动更新红包信息

## 🛠️ 技术栈

### 前端
- **React** - 用户界面框架
- **RainbowKit** - 钱包连接UI库
- **Wagmi** - React Ethereum库
- **Viem** - 轻量级Ethereum客户端
- **Tailwind CSS** - 原子化CSS框架

### 智能合约
- **Solidity** - 合约开发语言
- **Hardhat** - 开发环境和测试框架
- **OpenZeppelin** - 安全的合约库

## 🔧 开发指南

### 添加新功能

1. 修改智能合约（如需要）
2. 更新ABI文件
3. 创建或修改React组件
4. 添加对应的测试用例

### 测试

```bash
# 前端测试
npm test

# 合约测试
cd hardhat
npm run test
```

### 构建

```bash
# 构建生产版本
npm run build
```

## 🌐 支持的网络

- Ethereum Mainnet
- Ethereum Sepolia (测试网)
- Ethereum Goerli (测试网)
- Polygon
- Optimism
- Arbitrum

## 🔐 安全注意事项

- 合约使用了基础的安全措施，建议在主网部署前进行专业审计
- 随机数生成使用链上数据，在生产环境中建议使用更安全的随机数方案
- 请妥善保管私钥，不要将私钥提交到代码仓库

## 📄 许可证

本项目基于 GPL-3.0 许可证开源。

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues
- 邮箱: [你的邮箱]

---

⭐ 如果这个项目对你有帮助，请给一个星星！
