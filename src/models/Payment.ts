import Transaction from './Transaction';
import Account from './Account'
import {AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    tableName: 'payment',
})

export default class Payment extends Model <Payment> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @ForeignKey(() => Transaction)
    @Column('transaction_id')
    public transactionId: number;

    @Column({
        allowNull: false,
        field: 'value',
    })
    public value: number;
    
    @Column({
        field: 'created_at',
    })
    public createdAt: Date;
}
