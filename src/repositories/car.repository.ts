import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Car, CarRelations, Driver} from '../models';
import {DriverRepository} from './driver.repository';

export class CarRepository extends DefaultCrudRepository<
  Car,
  typeof Car.prototype.idCar,
  CarRelations
> {

  public readonly driver: HasOneRepositoryFactory<Driver, typeof Car.prototype.idCar>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(Car, dataSource);
    this.driver = this.createHasOneRepositoryFactoryFor('driver', driverRepositoryGetter);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
  }
}
