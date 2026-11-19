export interface PaymentOption {
  id: string;
  label: string;
  discountPaise: number;
  offer?: string;
}

export interface WalletTransaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  credited: boolean;
}
