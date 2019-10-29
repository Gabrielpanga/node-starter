import { User } from '@models/user.model';

export default async () => {
  console.log('Running user seed');
  await User.create({
    name: 'Codelitt'
  });
  console.log('Completed running user seed');
};
