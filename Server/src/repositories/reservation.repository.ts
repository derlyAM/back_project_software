import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnimovedatasourceDataSource} from '../datasources';
import {Reservation, ReservationRelations} from '../models';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.reservation_id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.unimovedatasource') dataSource: UnimovedatasourceDataSource,
  ) {
    super(Reservation, dataSource);
  }
}
