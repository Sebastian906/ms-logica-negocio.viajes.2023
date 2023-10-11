import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distance, DistanceRelations, Request, Travel} from '../models';
import {RequestRepository} from './request.repository';
import {TravelRepository} from './travel.repository';

export class DistanceRepository extends DefaultCrudRepository<
  Distance,
  typeof Distance.prototype.idDistance,
  DistanceRelations
> {

  public readonly request: HasOneRepositoryFactory<Request, typeof Distance.prototype.idDistance>;

  public readonly travel: HasOneRepositoryFactory<Travel, typeof Distance.prototype.idDistance>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>,
  ) {
    super(Distance, dataSource);
    this.travel = this.createHasOneRepositoryFactoryFor('travel', travelRepositoryGetter);
    this.registerInclusionResolver('travel', this.travel.inclusionResolver);
    this.request = this.createHasOneRepositoryFactoryFor('request', requestRepositoryGetter);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
