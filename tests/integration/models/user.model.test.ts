import { User } from '@models/user.model';
import { UserFactory } from '../factories/UserFactory';

const userFactory = new UserFactory();

describe('User', () => {
  describe('#create', () => {
    describe('with valid params', () => {
      it('creates a user', async () => {
        const user = await User.create(userFactory.build());
        expect(user!.id).toBeTruthy();
      });
    });

    describe('with invalid params', () => {
      it('fails to create a user', async () => {
        const userParams = userFactory.build({
          name: userFactory.getFaker().random.alphaNumeric(129)
        });

        expect(User.create(userParams)).rejects.toThrowError();
      });
    });
  });
});
