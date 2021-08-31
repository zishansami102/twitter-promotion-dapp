import { useState } from 'react';

import * as constants from "../constants";
import { TextField, Button, Typography, Divider } from '@material-ui/core';

import TwitterTask from "../abis/TwitterTask.json";
import {createTask, claimReward, applyTask } from "../utils";

function RequestForm() {
    // const [walletAddr, setWalletAddr] = useState();
    // const [etherReq, setEtherReq] = useState();
    // const [etherDonate, setEtherDonate] = useState();
    // const [requestLoading, setRequestLoading] = useState(false);
    // const [donateLoading, setDonateLoading] = useState(false);

    const [title, setTitle] = useState();
    const [mustHavePhrase, setMustHavePhrase] = useState();
    const [rewardPerUnit, setRewardPerUnit] = useState();
    const [totalReward, setTotalReward] = useState();
    const [taskId, setTaskId] = useState();
    const [tweetId, setTweetId] = useState();
    const [createLoading, setCreateLoading] = useState(false);
    const [applyLoading, setApplyLoading] = useState(false);
    const [claimLoading, setClaimLoading] = useState(false);

    

    async function handlecreateTask() {
        setCreateLoading(true);
        await createTask(constants.TWITTERTASK_ADDR, TwitterTask, title, mustHavePhrase, rewardPerUnit, totalReward);
        setCreateLoading(false);
    }
    async function handleapplyTask() {
        setApplyLoading(true);
        await applyTask(constants.TWITTERTASK_ADDR, TwitterTask, tweetId, taskId);
        setApplyLoading(false);
    }
    async function handleclaimReward() {
        setClaimLoading(true);
        await claimReward(constants.TWITTERTASK_ADDR, TwitterTask, tweetId, taskId);
        setClaimLoading(false);
    }

    // async function handleGetEther() {
    //     setRequestLoading(true);
    //     await getEther(process.env.DEPLOYED_ADDRESS, TwitterTask, etherReq, walletAddr);
    //     setRequestLoading(false);
    // }

    // async function handleDonateEther() {
    //     setDonateLoading(true);
    //     await donateEther(process.env.DEPLOYED_ADDRESS, TwitterTask, etherDonate);
    //     setDonateLoading(false);
    // }

    return (
        <div className="App" style={{ padding: "100px" }}>
            <Typography variant="h4">
                Twitter Task
            </Typography>

            <TextField fullWidth onChange={e => setTitle(e.target.value)} label="Title of task" /><br /><br />
            <TextField fullWidth onChange={e => setMustHavePhrase(e.target.value)} label="Tweet must have phrase" /><br /><br />
            <TextField fullWidth onChange={e => setRewardPerUnit(e.target.value)} type="number" label="Reward per like" /><br /><br />
            <TextField fullWidth onChange={e => setTotalReward(e.target.value)} type="number" label="Total Reward Offered" /><br /><br />

            {createLoading && <div><p>Loading...</p><br /></div>}
            <Button onClick={handlecreateTask} variant="contained" color="primary">
                Create Task
            </Button><br /><br /><br />

            <Divider light /><br /><br />

            <TextField fullWidth onChange={e => setTweetId(e.target.value)} label="Paste your Tweet ID" /><br /><br />
            <TextField fullWidth onChange={e => setTaskId(e.target.value)} type="number" label="Task ID" /><br /><br />
            {applyLoading && <div><p>Loading...</p><br /></div>}
            <Button onClick={handleapplyTask} variant="contained" color="primary">
                Apply Task
            </Button><br /><br />

            <Divider light /><br /><br />

            <TextField fullWidth onChange={e => setTweetId(e.target.value)} label="Paste your Tweet ID" /><br /><br />
            <TextField fullWidth onChange={e => setTaskId(e.target.value)} type="number" label="Task ID" /><br /><br />
            {claimLoading && <div><p>Loading...</p><br /></div>}
            <Button onClick={handleclaimReward} variant="contained" color="primary">
                Claim Reward
            </Button><br /><br />

        </div>
    );
}

export default RequestForm;