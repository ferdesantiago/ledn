import { promisePool } from '../libs/database';

async function getAccountById(id: string) {
    const [rows] = await promisePool.query('SELECT * FROM accounts WHERE id=?', [id]);
    return rows;
}

export {
    getAccountById,
}