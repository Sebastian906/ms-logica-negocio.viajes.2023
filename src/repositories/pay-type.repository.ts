import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayType, PayTypeRelations} from '../models';

export class PayTypeRepository extends DefaultCrudRepository<
  PayType,
  typeof PayType.prototype.idType,
  PayTypeRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PayType, dataSource);
  }
}
