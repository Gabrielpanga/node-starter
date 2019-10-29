import { Model } from 'sequelize/types';
import * as faker from 'faker';

export abstract class BaseFactory<T extends Model> {
  model: T;

  constructor(model: any) {
    this.model = model;
  }

  public getFaker() {
    return faker;
  }

  abstract build(params: Partial<T>): any;

  public create(params: Partial<T> = {}) {
    const aModel = this.build(params);
    this.model.save(aModel);
  }
}
