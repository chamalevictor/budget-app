import pool from "../configs/db.js";

// Get all accounts.
const getAccounts = async (req, res) => {
  try {
    const accounts = await pool.query(
      "SELECT * FROM account WHERE id_end_user = $1",
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
  console.log(req.body);
  const { id_account, id_end_user, id_bank, id_account_type, id_currency } =
    req.body;
  try {
    const newAccount = await pool.query(
      `INSERT INTO account (id_account, id_end_user, id_bank, id_account_type, id_currency)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_account, id_end_user, id_bank, id_account_type, id_currency]
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

const deleteAccount = async (req, res) => {};

export { getAccount, getAccounts, createAccount, updateAccount, deleteAccount };
