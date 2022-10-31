import fs from 'fs';
import { promisePool } from '../libs/database';

const fillAccounts = async () => {
    try {
        var dataArray = JSON.parse(fs.readFileSync('./src/seeds/accounts-api.json', 'utf-8'));
        const accountsQuery: string[] = [];
        dataArray.forEach((element: any) => {
            accountsQuery.push(`('${element.userEmail}', ${element.balance}, '${element.updatedAt}')`);
        });
        await promisePool.query(`INSERT INTO accounts (userEmail, balance, updatedAt) VALUES ${accountsQuery.join(',')}`);
    } catch(error) {
        console.log(error);
    }
}

const getAccounts = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM accounts');
        console.log(rows);
    } catch(error) {
        console.log(error);
    }
}

fillAccounts();
getAccounts();
