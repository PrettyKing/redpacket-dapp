const hre = require("hardhat");

async function main() {
  console.log("正在部署RedPacket合约...");
  
  // 获取合约工厂
  const RedPacket = await hre.ethers.getContractFactory("RedPacket");
  
  // 部署合约
  const redPacket = await RedPacket.deploy();
  
  // 等待部署完成
  await redPacket.waitForDeployment();
  
  const contractAddress = await redPacket.getAddress();
  
  console.log("RedPacket合约已部署到:", contractAddress);
  console.log("网络:", hre.network.name);
  
  // 如果不是本地网络，等待几个区块确认后验证合约
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("等待区块确认...");
    await redPacket.deploymentTransaction().wait(6);
    
    console.log("正在验证合约...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("合约验证成功!");
    } catch (error) {
      console.log("合约验证失败:", error.message);
    }
  }
  
  console.log("\n部署信息:");
  console.log("合约地址:", contractAddress);
  console.log("请将此地址更新到 src/contracts/abi.js 中的 CONTRACT_ADDRESS");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });