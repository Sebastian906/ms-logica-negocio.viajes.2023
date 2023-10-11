import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Record, RecordRelations, Travel, Passenger, Driver} from '../models';
import {TravelRepository} from './travel.repository';
import {PassengerRepository} from './passenger.repository';
import {DriverRepository} from './driver.repository';

export class RecordRepository extends DefaultCrudRepository<
  Record,
  typeof Record.prototype.idRecord,
  RecordRelations
> {

  public readonly travel: HasOneRepositoryFactory<Travel, typeof Record.prototype.idRecord>;

  public readonly passenger: HasOneRepositoryFactory<Passenger, typeof Record.prototype.idRecord>;

  public readonly driver: HasOneRepositoryFactory<Driver, typeof Record.prototype.idRecord>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(Record, dataSource);
    this.driver = this.createHasOneRepositoryFactoryFor('driver', driverRepositoryGetter);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
    this.passenger = this.createHasOneRepositoryFactoryFor('passenger', passengerRepositoryGetter);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
    this.travel = this.createHasOneRepositoryFactoryFor('travel', travelRepositoryGetter);
    this.registerInclusionResolver('travel', this.travel.inclusionResolver);
  }
}
