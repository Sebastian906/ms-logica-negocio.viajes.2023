import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Travel, TravelRelations, Distance, Request, Record, PayMethod} from '../models';
import {DistanceRepository} from './distance.repository';
import {RequestRepository} from './request.repository';
import {RecordRepository} from './record.repository';
import {PayMethodRepository} from './pay-method.repository';

export class TravelRepository extends DefaultCrudRepository<
  Travel,
  typeof Travel.prototype.idTravel,
  TravelRelations
> {

  public readonly distance: HasOneRepositoryFactory<Distance, typeof Travel.prototype.idTravel>;

  public readonly request: HasOneRepositoryFactory<Request, typeof Travel.prototype.idTravel>;

  public readonly record: HasOneRepositoryFactory<Record, typeof Travel.prototype.idTravel>;

  public readonly payMethod: BelongsToAccessor<PayMethod, typeof Travel.prototype.idTravel>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DistanceRepository') protected distanceRepositoryGetter: Getter<DistanceRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('RecordRepository') protected recordRepositoryGetter: Getter<RecordRepository>, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>,
  ) {
    super(Travel, dataSource);
    this.payMethod = this.createBelongsToAccessorFor('payMethod', payMethodRepositoryGetter,);
    this.registerInclusionResolver('payMethod', this.payMethod.inclusionResolver);
    this.record = this.createHasOneRepositoryFactoryFor('record', recordRepositoryGetter);
    this.registerInclusionResolver('record', this.record.inclusionResolver);
    this.request = this.createHasOneRepositoryFactoryFor('request', requestRepositoryGetter);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
    this.distance = this.createHasOneRepositoryFactoryFor('distance', distanceRepositoryGetter);
    this.registerInclusionResolver('distance', this.distance.inclusionResolver);
  }
}
