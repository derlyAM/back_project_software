import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UniMoveConnectionDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.uniMoveConnection') dataSource: UniMoveConnectionDataSource,
  ) {
    super(Users, dataSource);
  }
}
