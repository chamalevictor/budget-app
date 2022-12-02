import pool from "../configs/db.js";

// Get Transactions.
const getTransactions = async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT t.date_transaction as date, t.id_account as account, tt.name as transaction, ca.name as category, t.description as description, cu.name as currency, t.ammount, t.id_destination as destination, t.id_transaction as reference
      FROM transaction t
      INNER JOIN transaction_type tt
      ON tt.id_transaction_type = t.id_transaction_type
      INNER JOIN category ca
      ON ca.id_category = t.id_category
      INNER JOIN currency cu
      ON cu.id_currency = t.id_currency
      INNER JOIN account a
      ON a.id_account = t.id_account
      INNER JOIN end_user e
      ON a.id_end_user = e.id_end_user
      WHERE a.id_end_user = $1 
      ORDER BY date DESC, t.id_transaction DESC
          `,
      [req.user.rows[0].id_end_user]
    );

    res.json(transactions.rows);
  } catch (error) {
    console.log(error);
  }
};

const newTransaction = async (req, res) => {
  const {
    transactionDate,
    account,
    transactionType,
    category,
    description,
    currency,
    ammount,
  } = req.body;
  try {
    const newTransaction = await pool.query(
      `INSERT INTO transaction (date_transaction, id_account, id_transaction_type, id_category, description, id_currency, ammount)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        transactionDate,
        account,
        transactionType,
        category,
        description,
        currency,
        ammount,
      ]
    );
    res.json(newTransaction.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const makeTransfer = async (req, res) => {
  const { transferDate, origin, destination, currency, ammount } = req.body;
  try {
    const expense = await pool.query(
      `INSERT INTO transaction (date_transaction, id_account, id_transaction_type, id_category, description, id_currency, ammount)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        transferDate,
        origin,
        2,
        8,
        `Transferencia hacia ${destination}`,
        currency,
        ammount * -1,
      ]
    );
    if (expense) {
      const income = await pool.query(
        `INSERT INTO transaction (date_transaction, id_account, id_transaction_type, id_category, description, id_currency, ammount)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          transferDate,
          destination,
          1,
          8,
          `Transferencia desde ${origin}`,
          currency,
          ammount,
        ]
      );
    }

    res.json({ msg: "Success" });
  } catch (error) {
    console.log(error);
  }
};

export { getTransactions, newTransaction, makeTransfer };
