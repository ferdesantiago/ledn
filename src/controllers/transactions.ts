import express from 'express';
import validator from 'validator';
import { sendBalance, receiveBalance } from '../services/transactions';

async function send(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const { email, amount } = req.body;
        if (!validator.isEmail(email)) throw `Email must be set, received: ${email}`;
        if (!/^[0-9]+$/.test(amount)) throw `Amount must be a number, received: ${amount}`;
        const transaction = await sendBalance(email, amount);
        answer = res.json({
            status: "success",
            data: transaction,
        });
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

async function receive(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const { email, amount } = req.body;
        if (!validator.isEmail(email)) throw `Email must be set, received: ${email}`;
        if (!/^[0-9]+$/.test(amount)) throw `Amount must be a number, received: ${amount}`;
        const transaction = await receiveBalance(email, amount);
        answer = res.json({
            status: "success",
            data: transaction,
        });
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

export {
    send,
    receive,
}