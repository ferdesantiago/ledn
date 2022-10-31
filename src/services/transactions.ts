import { promisePool } from '../libs/database';

async function sendBalance(email: string, amount: string) {
    let connection = await promisePool.getConnection();
    let message = '';
    try {
        await connection.beginTransaction();
        const [row] = await connection.query('SELECT id, userEmail, balance FROM accounts WHERE userEmail=? AND balance>=?', [email, amount]);
        if (Object.values(row).length > 0) {
            await connection.query("INSERT INTO transactions (userEmail, amount, type) VALUES (?, ?, ?)",
              [email, amount, 'send']);
            const [update] = await connection.query("UPDATE accounts SET balance=balance-? WHERE userEmail=?",
              [amount, email]);
            const updateResults: any = update;
            if (updateResults.affectedRows > 0) {
                await connection.commit();
                message = 'Transaction sent!';
            } else {
                throw 'Error';
            }
        } else {
            await connection.rollback();
            message = 'Email not found or balance is not enough';
        }
    } catch (error) {
        console.log(error);
        await connection.rollback();
        message = 'Error while sending your transaction, please try again';
    }
    return message;
}

async function receiveBalance(email: string, amount: string) {
    let connection = await promisePool.getConnection();
    let message = '';
    try {
        await connection.beginTransaction();
        const [row] = await connection.query('SELECT id, userEmail, balance FROM accounts WHERE userEmail=?', [email]);
        if (Object.values(row).length > 0) {
            await connection.query("INSERT INTO transactions (userEmail, amount, type) VALUES (?, ?, ?)",
              [email, amount, 'receive']);
            const [update] = await connection.query("UPDATE accounts SET balance=balance+? WHERE userEmail=?",
              [amount, email]);
            const updateResults: any = update;
            if (updateResults.affectedRows > 0) {
                await connection.commit();
                message = 'Transaction received!';
            } else {
                throw 'Error';
            }
        } else {
            await connection.rollback();
            message = 'Email not found';
        }
    } catch (error) {
        console.log(error);
        await connection.rollback();
        message = 'Error while receiving your transaction, please try again';
    }
    return message;
}

export {
    sendBalance,
    receiveBalance,
}