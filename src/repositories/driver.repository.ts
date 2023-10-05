import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, DriverRelations} from '../models';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.idDriver,
  DriverRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Driver, dataSource);
  }
}
