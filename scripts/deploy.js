const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // const APIConsumer = await hre.ethers.getContractFactory("APIConsumer");
    // const apiconsumer = await APIConsumer.deploy();

    // await apiconsumer.deployed();

    const TwitterTask = await hre.ethers.getContractFactory("TwitterTask");
    const twittertask = await TwitterTask.deploy();

    await twittertask.deployed();
    console.log("Twitter Task address:", twittertask.address);
    // console.log("API Consumer deployed at: ", apiconsumer.address);

    saveFrontendFiles(twittertask);
    // saveFrontendFilesapi(apiconsumer);
}

function saveFrontendFiles(twittertask) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../src/abis";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ TwitterTask: twittertask.address }, undefined, 2)
    );

    const TwitterTaskArtifact = artifacts.readArtifactSync("TwitterTask");

    fs.writeFileSync(
        contractsDir + "/TwitterTask.json",
        JSON.stringify(TwitterTaskArtifact, null, 2)
    );
}

// function saveFrontendFilesapi(apiconsumer) {
//     const fs = require("fs");
//     const contractsDir = __dirname + "/../src/abis";

//     if (!fs.existsSync(contractsDir)) {
//         fs.mkdirSync(contractsDir);
//     }

//     fs.writeFileSync(
//         contractsDir + "/contract-address.json",
//         JSON.stringify({ APIConsumer: apiconsumer.address }, undefined, 2)
//     );

//     const APIConsumerArtifact = artifacts.readArtifactSync("APIConsumer");

//     fs.writeFileSync(
//         contractsDir + "/APIConsumer.json",
//         JSON.stringify(APIConsumerArtifact, null, 2)
//     );
// }

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });