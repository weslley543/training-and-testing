export interface IWithdraw {
   transaction_id: string;
   value: number;
   valueInAccount?:number;
   value_restant?: number;
   accountNumber: string;
};
