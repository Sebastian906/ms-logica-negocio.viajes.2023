import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Passenger, PassengerRelations} from '../models';

export class PassengerRepository extends DefaultCrudRepository<
  Passenger,
  typeof Passenger.prototype.idPassenger,
  PassengerRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Passenger, dataSource);
  }
}
