import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Request, RequestRelations, Driver, Status, Distance, Travel, Passenger} from '../models';
import {DriverRepository} from './driver.repository';
import {StatusRepository} from './status.repository';
import {DistanceRepository} from './distance.repository';
import {TravelRepository} from './travel.repository';
import {PassengerRepository} from './passenger.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.idRequest,
  RequestRelations
> {

  public readonly drivers: HasManyRepositoryFactory<Driver, typeof Request.prototype.idRequest>;

  public readonly status: HasOneRepositoryFactory<Status, typeof Request.prototype.idRequest>;

  public readonly distance: HasOneRepositoryFactory<Distance, typeof Request.prototype.idRequest>;

  public readonly travel: HasOneRepositoryFactory<Travel, typeof Request.prototype.idRequest>;

  public readonly passenger: BelongsToAccessor<Passenger, typeof Request.prototype.idRequest>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('StatusRepository') protected statusRepositoryGetter: Getter<StatusRepository>, @repository.getter('DistanceRepository') protected distanceRepositoryGetter: Getter<DistanceRepository>, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>,
  ) {
    super(Request, dataSource);
    this.passenger = this.createBelongsToAccessorFor('passenger', passengerRepositoryGetter,);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
    this.travel = this.createHasOneRepositoryFactoryFor('travel', travelRepositoryGetter);
    this.registerInclusionResolver('travel', this.travel.inclusionResolver);
    this.distance = this.createHasOneRepositoryFactoryFor('distance', distanceRepositoryGetter);
    this.registerInclusionResolver('distance', this.distance.inclusionResolver);
    this.status = this.createHasOneRepositoryFactoryFor('status', statusRepositoryGetter);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.drivers = this.createHasManyRepositoryFactoryFor('drivers', driverRepositoryGetter,);
    this.registerInclusionResolver('drivers', this.drivers.inclusionResolver);
  }
}
