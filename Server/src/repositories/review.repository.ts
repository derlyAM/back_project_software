import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnimovedatasourceDataSource} from '../datasources';
import {Review, ReviewRelations} from '../models';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.review_id,
  ReviewRelations
> {
  constructor(
    @inject('datasources.unimovedatasource') dataSource: UnimovedatasourceDataSource,
  ) {
    super(Review, dataSource);
  }
}
