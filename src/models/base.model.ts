import { Model, UpdateOptions, DestroyOptions } from 'sequelize';

abstract class BaseModel extends Model {
  public static async updateOne(
    instance: BaseModel
  ): Promise<[number, BaseModel[] | null]> {
    const updateOpts: UpdateOptions = {
      where: { id: (instance as any).id },
      limit: 1
    };

    return (this as any).update(instance, updateOpts);
  }

  public static async deleteOne(id: number) {
    const deleteOpts: DestroyOptions = {
      where: { id },
      limit: 1
    };

    return (this as any).destroy(deleteOpts);
  }
}

export default BaseModel;
