import { ResourceWithOptions } from 'admin-bro';
import { User } from '../../users/entities/user.entity';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {},
};

export default UserResource;
