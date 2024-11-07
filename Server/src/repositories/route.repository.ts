import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnimovedatasourceDataSource} from '../datasources';
import {Route, RouteRelations} from '../models';

export class RouteRepository extends DefaultCrudRepository<
  Route,
  typeof Route.prototype.route_id,
  RouteRelations
> {
  constructor(
    @inject('datasources.unimovedatasource') dataSource: UnimovedatasourceDataSource,
  ) {
    super(Route, dataSource);
  }
}
