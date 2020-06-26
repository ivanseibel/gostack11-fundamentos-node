import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsList {
  transactions: Transaction[];
  balance: Balance;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsList {
    const transactionsList = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactionsList;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(item => {
      if (item.type === 'income') {
        balance.income += item.value;
      }
      if (item.type === 'outcome') {
        balance.outcome += item.value;
      }
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
