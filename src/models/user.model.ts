import { DataTypes } from 'sequelize';
import { database } from '@db';
import BaseModel from './base.model';

export class IUser {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class User extends BaseModel implements IUser {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async findByName(name: string): Promise<User | null> {
    const queryOpts = {
      where: { name }
    };

    return User.findOne(queryOpts);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize: database
  }
);
