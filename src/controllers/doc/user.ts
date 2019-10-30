export interface IUser {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userExample: IUser = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Joe'
};
