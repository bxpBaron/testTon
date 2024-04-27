import * as fs from "fs";
import * as path from "path";
import { Address, toNano,contractAddress } from "@ton/core";
import { TonFarmToken } from "./output/sample_TonFarmToken";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { buildOnchainMetadata } from "./utils/jetton-helpers";


(async () => {
    // Parameters
    let testnet = true;
    let packageName = "sample_TonFarmToken.pkg";
    let owner = Address.parse("0QDpq5r5K-JRjWEHyLes0_1tLN6SuQlnklknYbNPgRgion-X");

    const jettonParams = {
        name: "Frank_USDT_02",
        description: "This is Frank Test Usdt 0.1",
        symbol: "Frank_USDT_02",
        image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
    };
    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    let max_supply = toNano(123456766689011); // 🔴 Set the specific total supply in nano

    let init = await TonFarmToken.init(owner,content, max_supply);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
