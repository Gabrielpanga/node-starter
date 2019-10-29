import { User } from '@models';
import { BaseFactory } from './BaseFactory';

export class UserFactory extends BaseFactory<User> {
  constructor() {
    super(User);
  }

  public build(props: Partial<User> = {}): any {
    const defaults: Partial<User> = {
      name: this.getFaker().name.findName()
    };

    return { ...defaults, ...props };
  }
}
