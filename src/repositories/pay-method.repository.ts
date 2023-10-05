import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayMethod, PayMethodRelations} from '../models';

export class PayMethodRepository extends DefaultCrudRepository<
  PayMethod,
  typeof PayMethod.prototype.idPayMethod,
  PayMethodRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PayMethod, dataSource);
  }
}
