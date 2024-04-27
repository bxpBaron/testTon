import { TonClient4, WalletContractV4, internal,toNano } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";
import {Address, contractAddress} from "@ton/core";
import { TonFarmToken } from "./output/sample_TonFarmToken";
import { JettonDefaultWallet } from "./output/sample_JettonDefaultWallet";
import * as buffer from "node:buffer";

(async () => {

    // 创建客户端链接
    const client = new TonClient4({
        endpoint: 'https://testnet-v4.tonhubapi.com',
    });

    // 导入 助记词
    let keyPair = await mnemonicToPrivateKey("equip float december museum furnace member alarm charge term sad penalty express muffin lemon pistol rice caution sport iron transfer insect rate rib shoot".split(" "));
    // 创建工作节点
    let workchain = 0; // Usually you need a workchain 0
    // 根据助记词信息获取钱包
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    //打开当前钱包
    let contract = client.open(wallet);

    client.getAccount(,contract.address)


    /**获取 TON 余额**/
    //let balance: bigint = await contract.getBalance();
    //console.log(balance);

    /**转账 主币**/
    /**
     let seqno: number = await contract.getSeqno();
     let transfer = contract.createTransfer({
     seqno,
     secretKey: keyPair.secretKey,
     messages: [
     internal({
     value: '0.3',
     to: 'EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e',
     body: 'Hello world',
     bounce: false,
     })]
     });
     await contract.send(transfer);
     **/

    /** 发送信息 使用对应代币信息**/

    //let walletSender = contract.sender(keyPair.secretKey);
    //let contract_address = Address.parse('EQB-qDMlkObMlzRd-zvcuQLhJXv-GK68-t3HnCnRsl5L4bYI');
    //let contract_this = await TonFarmToken.fromAddress(contract_address);
    //let contract_this_open = client.open(contract_this);
    //获取钱包 的 对应 子合约地址
    //console.log(await contract_this_open.getGetWalletAddress(contract.address));

    //查询代币金额
    /**
    let jetton_wallet = await contract_this_open.getGetWalletAddress(contract.address);
    console.log(": " + jetton_wallet.toString());
    let contract_dataFormat = JettonDefaultWallet.fromAddress(jetton_wallet);
    let contract_1 = client.open(contract_dataFormat);
    console.log("Deployer's JettonWallet: " + contract_1.address);
    let jettonWalletBalance = await (await contract_1.getGetWalletData()).balance;
    console.log("Deployer's JettonWallet: " + jettonWalletBalance);
    **/

    /***发送消息铸币*/
    /**
    contract_this_open.send(walletSender,{ value: toNano(1),bounce:true },{
        $$type: 'Mint',
        amount: 999998_000_000_000n,
        receiver: contract.address,
    });
    //contract_this_open.send(walletSender,{ value: toNano(1) },"Mint: 100");
     **/




})();
