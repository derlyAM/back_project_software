import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnimovedatasourceDataSource} from '../datasources';
import {Vehicle, VehicleRelations} from '../models';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.vehicle_id,
  VehicleRelations
> {
  constructor(
    @inject('datasources.unimovedatasource') dataSource: UnimovedatasourceDataSource,
  ) {
    super(Vehicle, dataSource);
  }
}
