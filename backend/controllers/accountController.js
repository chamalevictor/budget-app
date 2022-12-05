import pool from "../configs/db.js";

// Get all accounts.
const getAccounts = async (req, res) => {
  try {
    const accounts = await pool.query(
      `SELECT a.id_account as Account_ID, b.name as Bank, at.name as Account_Type, c.name as Currency, a.active as State, 
      (SELECT SUM(t.ammount)
        FROM transaction t
        WHERE a.id_account = t.id_account
       ) as balance
	  FROM account a
      INNER JOIN bank b
      ON b.id_bank = a.id_bank
      INNER JOIN account_type at
      ON at.id_account_type = a.id_account_type
      INNER JOIN currency c
      ON c.id_currency = a.id_currency
	  WHERE id_end_user = $1
    AND a.active = true 
      `,
      [req.user.rows[0].id_end_user]
    );

    res.json(accounts.rows);
  } catch (error) {
    console.log(error);
  }
};

// Get a single account.
const getAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await pool.query(
      "SELECT * FROM account WHERE id_account = $1",
      [id]
    );
    if (account.rows.length === 0) {
      const error = new Error("Cuenta no encontrada");
      return res.status(404).json({ msg: error.message });
    }
    if (
      account.rows[0].id_end_user.toString() !==
      req.user.rows[0].id_end_user.toString()
    ) {
      const error = new Error("Acción no permitida");
      return res.status(401).json({ msg: error.message });
    }

    res.json(account.rows);
  } catch (error) {
    console.log(error);
  }
};

// TODO: Pending to mark account as deleted.
// Create an account.
const createAccount = async (req, res) => {
  const { id_account, id_bank, id_account_type, id_currency } = req.body;
  try {
    const newAccount = await pool.query(
      `INSERT INTO account (id_account, id_end_user, id_bank, id_account_type, id_currency, active)
                VALUES ($1, $2, $3, $4, $5, true) RETURNING *`,
      [
        id_account,
        req.user.rows[0].id_end_user,
        id_bank,
        id_account_type,
        id_currency,
      ]
    );
    res.json(newAccount.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await pool.query(
      "SELECT * FROM account WHERE id_account = $1",
      [id]
    );
    if (account.rows.length === 0) {
      const error = new Error("Cuenta no encontrada");
      return res.status(404).json({ msg: error.message });
    }
    if (
      // Verify that the account belongs to the user.
      account.rows[0].id_end_user.toString() !==
      req.user.rows[0].id_end_user.toString()
    ) {
      const error = new Error("Acción no permitida");
      return res.status(401).json({ msg: error.message });
    }

    const id_bank = req.body.id_bank || account.rows[0].id_bank;
    const id_account_type =
      req.body.id_account_type || account.rows[0].id_account_type;
    const id_currency = req.body.id_currency || account.rows[0].id_currency;

    const updatedAccount = await pool.query(
      "UPDATE account SET id_bank = $1, id_account_type = $2, id_currency = $3",
      [id_bank, id_account_type, id_currency]
    );
    res.json(updatedAccount.rows);
  } catch (error) {
    console.log(error);
  }
};

const deleteAccount = async (req, res) => {
  const { account_id } = req.body;
  try {
    const deletedAccount = await pool.query(
      `UPDATE account SET active = false WHERE id_account = $1 RETURNING *
      `,
      [account_id]
    );

    res.json(deleteAccount.rows);
  } catch (error) {
    console.log(error);
  }
};

export { getAccount, getAccounts, createAccount, updateAccount, deleteAccount };
