import { User } from '@models/user.model';
import {
  Path,
  GET,
  PathParam,
  Errors,
  POST,
  PATCH,
  DELETE
} from 'typescript-rest';
import { Response, Produces, Example } from 'typescript-rest-swagger';
import { NotFoundError } from 'typescript-rest/dist/server/model/errors';
import { userExample } from './docs/user';
import { IUser } from './types/user';
import { CountResponse } from './types/common';

@Path('/users')
@Produces('application/json')
export class UsersController {
  /**
   * Recovers all active users
   */
  @GET
  @Response<IUser[]>(200, 'Retrieve a list of users.')
  @Example<Array<IUser>>([userExample])
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
  @Example<IUser>(userExample)
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
  @Example<IUser>(userExample)
  async create(user: IUser) {
    return await User.create(user);
  }

  /**
   * Updates the user
   * @param id user primary identifier
   */
  @Path('/:id')
  @PATCH
  @Example<IUser>(userExample)
  @Response<IUser>(200, 'Update the user that was sent')
  async update(
    @PathParam('id') id: number,
    user: IUser
  ): Promise<IUser | null> {
    const result = await User.updateOne({ ...user, id });
    if (result) {
      return result as any;
    }
    throw new Errors.NotFoundError('User not found');
  }

  /**
   * Delete the user by its id
   * @param id user primary identifier
   */
  @Path('/:id')
  @DELETE
  @Response<CountResponse>(200, 'User was deleted')
  async delete(@PathParam('id') id: number): Promise<CountResponse> {
    const result = await User.deleteOne(id);
    if (result) {
      return new CountResponse(result);
    }
    throw new Errors.NotFoundError('User not found');
  }
}
