
CREATE TABLE currency(
	id_currency SERIAL NOT NULL,
	name TEXT,
	PRIMARY KEY (id_currency)
);


CREATE TABLE end_user (
	id_end_user SERIAL NOT NULL,
	name TEXT,
	lastname TEXT,
	dob DATE,
	email TEXT,
	password TEXT,
	confirmed BOOLEAN,
	token TEXT,
	PRIMARY KEY (id_end_user)
);

CREATE TABLE category (
	id_category SERIAL NOT NULL,
	name TEXT,
	PRIMARY KEY (id_category)
);

CREATE TABLE bank (
	id_bank SERIAL NOT NULL,
	name TEXT,
	PRIMARY KEY (id_bank)
);

CREATE TABLE account_type(
	id_account_type SERIAL NOT NULL,
	name TEXT,
	PRIMARY KEY (id_account_type)
);

CREATE TABLE transaction_type(
	id_transaction_type SERIAL NOT NULL,
	name TEXT,
	PRIMARY KEY (id_transaction_type)
);

CREATE TABLE account(
	id_account BIGINT NOT NULL,
	id_end_user INT,
	id_bank INT,
	id_account_type INT, 
	id_currency INT,
	active BOOLEAN,
	PRIMARY KEY (id_account),
	FOREIGN KEY (id_end_user) REFERENCES end_user(id_end_user),
	FOREIGN KEY (id_account_type) REFERENCES account_type (id_account_type)
);


CREATE TABLE transaction (
	id_transaction SERIAL NOT NULL,
	date_transaction DATE,
	id_account BIGINT,
	id_transaction_type INT, 
	id_category INT,
	description TEXT,
	id_currency INT,
	ammount NUMERIC(6,2),
	id_destination BIGINT,

	PRIMARY KEY (id_transaction),
	FOREIGN KEY (id_transaction_type) REFERENCES transaction_type (id_transaction_type),
	FOREIGN KEY (id_account) REFERENCES account (id_account),
	FOREIGN KEY (id_category) REFERENCES category (id_category),
	FOREIGN KEY (id_currency) REFERENCES currency (id_currency),
	FOREIGN KEY (id_destination) REFERENCES account (id_account)
);



-- Inserts to Currency
INSERT INTO currency (name) VALUES ('Quetzales');
INSERT INTO currency (name) VALUES ('Dólares');
INSERT INTO currency (name) VALUES ('Euros');

-- Inserts into Category
INSERT INTO category (name) VALUES ('Salario');
INSERT INTO category (name) VALUES ('Negocios');
INSERT INTO category (name) VALUES ('Comida');
INSERT INTO category (name) VALUES ('Gasolina');
INSERT INTO category (name) VALUES ('Servicios');
INSERT INTO category (name) VALUES ('Gastos Médicos');
INSERT INTO category (name) VALUES ('Vehículos');
INSERT INTO category (name) VALUES ('Transferencias');


-- Inserts into account_type
INSERT INTO account_type (name) VALUES ('Monetarios');
INSERT INTO account_type (name) VALUES ('Ahorros');
INSERT INTO account_type (name) VALUES ('Efectivo');

-- Inserts into transaction_type
INSERT INTO transaction_type (name) VALUES ('Crédito');
INSERT INTO transaction_type (name) VALUES ('Débito');

-- Insert banks
INSERT INTO bank (name) VALUES ('Dinero en Efectivo');
INSERT INTO bank (name) VALUES ('Banco Industrial');
INSERT INTO bank (name) VALUES ('BAM');
INSERT INTO bank (name) VALUES ('Banco Promerica');
INSERT INTO bank (name) VALUES ('Ficohsa');
INSERT INTO bank (name) VALUES ('BAC');
INSERT INTO bank (name) VALUES ('Banco Internacional');
INSERT INTO bank (name) VALUES ('G&T Continental');
INSERT INTO bank (name) VALUES ('Barural');
INSERT INTO bank (name) VALUES ('Bantrab');
INSERT INTO bank (name) VALUES ('Vivibanco');
