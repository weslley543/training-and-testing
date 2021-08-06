import {AutoIncrement, Column, DataType, ForeignKey , Model, PrimaryKey, Table} from 'sequelize-typescript';
import Account from './Account'

@Table({
    tableName: 'transaction',
})

export default class Transaction extends Model <Transaction> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @Column({
        allowNull: false,
        field: 'type',
    })
    public type: number;
    
    @Column({
        field: 'created_at',
    })
    public createdAt: Date;
    
    @Column({
        field: 'updated_at',
    })
    public updatedAt: Date;

    @ForeignKey(() => Account)
    @Column('account_number')
    public accountNumber: string;
}
