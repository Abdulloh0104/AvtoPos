export interface Statistic {
  users: IUsers;
  companies: ICompanies;
  transactions: ITransactions;
}

interface ICompanies {
  total: number;
  expiring_soon: number;
}

interface IUsers {
  active: number;
}

interface ITransactions {
  daily_transactions: number;
  monthly_top_products: number;
}
