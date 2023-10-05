import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distance, DistanceRelations} from '../models';

export class DistanceRepository extends DefaultCrudRepository<
  Distance,
  typeof Distance.prototype.idDistance,
  DistanceRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Distance, dataSource);
  }
}
