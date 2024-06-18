CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id),
  unique_identifier UUID UNIQUE NOT NULL,
  bank_account_number VARCHAR(10) NOT NULL,
  sort_code VARCHAR(8) NOT NULL,
  activation_status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
  credit_allowed BOOLEAN NOT NULL DEFAULT TRUE,
  debit_allowed BOOLEAN NOT NULL DEFAULT TRUE,
  daily_withdrawal_limit DECIMAL(10, 2) NOT NULL DEFAULT 0,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(id),
  type VARCHAR(10) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  beneficiary_account_number VARCHAR(10) NOT NULL,
  beneficiary_sort_code VARCHAR(8) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);