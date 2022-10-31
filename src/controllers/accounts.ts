import express from 'express';
import { getAccountById } from '../services/accounts';

async function account(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const id = req.params.id;
        if (!/^[0-9]+$/.test(id)) throw `Id must be a number, received: ${id}`;
        const account = await getAccountById(id);
        answer = res.json({
            status: "success",
            data: account,
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
    account,
}