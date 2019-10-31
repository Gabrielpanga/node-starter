import { Model, UpdateOptions, DestroyOptions } from 'sequelize';

abstract class BaseModel extends Model {
  public static async updateOne(instance: any): Promise<BaseModel | null> {
    const updateOpts: UpdateOptions = {
      where: { id: instance.id },
      limit: 1,
      returning: true
    };

    const result = await (this as any).update(instance, updateOpts);
    if (result[0]) {
      return result[1][0];
    }
    return null;
  }

  public static async deleteOne(id: number): Promise<number> {
    const deleteOpts: DestroyOptions = {
      where: { id },
      limit: 1
    };

    return (this as any).destroy(deleteOpts);
  }
}

export default BaseModel;
