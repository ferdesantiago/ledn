import fs from 'fs';
import { promisePool } from '../libs/database';

const fillTransactions = async () => {
    try {
        var dataArray = JSON.parse(fs.readFileSync('./src/seeds/transactions-api.json', 'utf-8'));
        const accountsQuery: string[] = [];
        dataArray.forEach((element: any) => {
            accountsQuery.push(`('${element.userEmail}', ${element.amount}, '${element.type}', '${element.createdAt}')`);
        });
        await promisePool.query(`INSERT INTO transactions (userEmail, amount, type, createdAt) VALUES ${accountsQuery.join(',')}`);
    } catch(error) {
        console.log(error);
    }
}

const getTransactions = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM transactions');
        console.log(rows);
    } catch(error) {
        console.log(error);
    }
}

fillTransactions();
getTransactions();
