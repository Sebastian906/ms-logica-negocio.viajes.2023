import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, DriverRelations, Car, Request, Record} from '../models';
import {CarRepository} from './car.repository';
import {RequestRepository} from './request.repository';
import {RecordRepository} from './record.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.idDriver,
  DriverRelations
> {

  public readonly car: HasOneRepositoryFactory<Car, typeof Driver.prototype.idDriver>;

  public readonly request: BelongsToAccessor<Request, typeof Driver.prototype.idDriver>;

  public readonly record: HasOneRepositoryFactory<Record, typeof Driver.prototype.idDriver>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CarRepository') protected carRepositoryGetter: Getter<CarRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('RecordRepository') protected recordRepositoryGetter: Getter<RecordRepository>,
  ) {
    super(Driver, dataSource);
    this.record = this.createHasOneRepositoryFactoryFor('record', recordRepositoryGetter);
    this.registerInclusionResolver('record', this.record.inclusionResolver);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
    this.car = this.createHasOneRepositoryFactoryFor('car', carRepositoryGetter);
    this.registerInclusionResolver('car', this.car.inclusionResolver);
  }
}
