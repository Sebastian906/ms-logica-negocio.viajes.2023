import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Record, RecordRelations} from '../models';

export class RecordRepository extends DefaultCrudRepository<
  Record,
  typeof Record.prototype.idRecord,
  RecordRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Record, dataSource);
  }
}
