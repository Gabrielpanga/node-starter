import { User, IUser } from '@models/user.model';
import {
  Path,
  GET,
  PathParam,
  Errors,
  POST,
  PUT,
  DELETE
} from 'typescript-rest';
import { Response, Produces, Example } from 'typescript-rest-swagger';
import { NotFoundError } from 'typescript-rest/dist/server/model/errors';

const exampleUser: IUser = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Joe'
};
@Path('/v1/users')
@Produces('application/json')
export default class UsersController {
  /**
   * Recovers all active users
   */
  @GET
  @Response<IUser[]>(200, 'Retrieve a list of users.')
  @Example<Array<IUser>>([exampleUser])
  async list() {
    return await User.findAll();
  }

  /**
   * Recovers the user resource by its id
   * @param id user primary identifier
   */
  @Path('/:id')
  @GET
  @Response<IUser>(200, 'Retrieve a user.')
  @Response<NotFoundError>(404, 'User not found')
  @Example<IUser>(exampleUser)
  async show(@PathParam('id') id: number): Promise<IUser> {
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
    throw new Errors.NotFoundError('User not found');
  }

  /**
   * Creates a user
   */
  @POST
  @Response<IUser>(201, 'Created user')
  async create(user: object) {
    return await User.create(user);
  }

  @PUT
  async update(user: any) {
    await User.updateOne(user);
  }

  @Path('/:id')
  @DELETE
  async delete(@PathParam('id') id: number) {
    await User.deleteOne(id);
  }
}
