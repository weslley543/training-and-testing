
import { StatementData } from '../interfaces/IStatementData';
export default (accountStatement: any) => {
    const {deposits, withdraws, payments} = accountStatement;
    return [].concat(getAllEntrances(deposits), getAllExits(withdraws), getAllExits(payments));
}

export const getAllEntrances = (deposits: any) => {
    return deposits.map(deposit => ({
        movimentation_date: deposit.created_at,
        document_number: deposit._id,
        type_movimentation: 'ENTRADA',
        value: Number(deposit.value)
  }))
}

export const getAllExits = (operations: any) => {
    return operations.map(operation => ({
        movimentation_date: operation.created_at,
        document_number: operation._id,
        type_movimentation: 'SAIDA',
        value: Number(operation.value)
    }))
};
