import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Travel, TravelRelations} from '../models';

export class TravelRepository extends DefaultCrudRepository<
  Travel,
  typeof Travel.prototype.idTravel,
  TravelRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Travel, dataSource);
  }
}
