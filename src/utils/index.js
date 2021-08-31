import { ethers } from 'ethers';
import { requestAccount, getContract } from "./common";

async function createTask(contractAddr, artifact, title, mustHavePhrase, rewardPerUnit, totalReward) {
    if (typeof window.ethereum != undefined) {
        await requestAccount();
        
        const twittertaskContract = getContract(contractAddr, artifact);
        try {

            let amount = ethers.utils.parseEther(totalReward);
            let rewardperlike = ethers.utils.parseEther(rewardPerUnit);
            let transaction = await twittertaskContract.createTask(title, mustHavePhrase, rewardperlike, {value: amount});

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
}

async function applyTask(contractAddr, artifact, tweetId, taskId) {
    if (typeof window.ethereum != undefined) {
        await requestAccount();
        
        const twittertaskContract = getContract(contractAddr, artifact);
        try {

            let transaction = await twittertaskContract.applyTask( tweetId, taskId);

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
}

async function claimReward(contractAddr, artifact, tweetId, taskId) {
    if (typeof window.ethereum != undefined) {
        await requestAccount();
        
        const twittertaskContract = getContract(contractAddr, artifact);
        try {

            let transaction = await twittertaskContract.claimReward( tweetId, taskId);

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
}

// async function getEther(contractAddr, artifact, etherReq, walletAddr) {
//     if (typeof window.ethereum != undefined) {
//         await requestAccount();
        
//         const faucetContract = getContract(contractAddr, artifact);
//         try {
//             console.log(`Requested Ether: ${etherReq}`);
//             console.log(`Wallet Address: ${walletAddr}`);

//             let amount = ethers.utils.parseEther(etherReq);
//             let transaction = await faucetContract.getEther(walletAddr, amount);

//             let receipt = await transaction.wait();
//             console.log(receipt);
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }
// }

// async function donateEther(contractAddr, artifact, etherDonate) {
//     if (typeof window.ethereum != undefined) {
//         await requestAccount();

//         const faucetContract = getContract(contractAddr, artifact);
//         try {
//             let amount = ethers.utils.parseEther(etherDonate);
//             let transaction = await faucetContract.donate({ value: amount });

//             let receipt = await transaction.wait();
//             console.log(receipt);

//         }
//         catch (err) {
//             console.log(err);
//         }
//     }
// }

export {createTask, applyTask, claimReward }