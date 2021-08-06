import {AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import AccountStatement  from './AccountStatement'

@Table({
    tableName: 'account',
})

export default class Account extends Model <Account> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @Column({
      allowNull: false,
      field: 'account_number',
    })
    public accountNumber: string;

    @Column({
        allowNull: false,
        field: 'name',
      })
      public name: string;
    
    @Column({
        field: 'created_at',
    })
    public createdAt: Date;
    
    @Column({
        field: 'updated_at',
    })
    public updatedAt: Date;
    
    @Column({
        allowNull: false,
        field: 'password_hash'
    })
    public passwordHash: string;

    @Column({
        field: 'balance',
    })
    public balance: number;

    @HasMany(() => AccountStatement)
    public acountStatements: AccountStatement[];
}