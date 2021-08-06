import {AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import Account  from './AccountStatement'

@Table({
    tableName: 'account_statement',
})

export default class AccountStatement extends Model<AccountStatement> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @Column({
        field: 'movement_date',
        allowNull: false,
    })
    public movementDate: Date;

    @Column({
        field: 'historic',
        allowNull: false,
    })
    public historic: string;

    @Column({
        field: 'value',
        allowNull: false,
    })
    public value: string;

    @ForeignKey(() => Account)
    @Column({
        field: 'account_id',
    })
    public accountId: number;

}
