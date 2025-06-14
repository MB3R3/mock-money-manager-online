
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  time: string;
  description: string;
  recipient_account_number?: number | null;
}

export interface PendingTransaction {
  type: 'withdrawal' | 'transfer';
  amount: number;
  recipientAccount?: string;
  description: string;
}
