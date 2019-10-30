import { User } from '@models/user.model';

const defaultUser = 'Codelitt';

export default {
  up: async function() {
    await User.create({
      name: defaultUser
    });
  },
  down: async function() {
    const user = await User.findOne({
      where: { name: defaultUser }
    });
    await User.deleteOne(user!.id);
  }
};
