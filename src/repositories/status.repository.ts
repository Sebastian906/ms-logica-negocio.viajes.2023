import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Status, StatusRelations, Request} from '../models';
import {RequestRepository} from './request.repository';

export class StatusRepository extends DefaultCrudRepository<
  Status,
  typeof Status.prototype.idState,
  StatusRelations
> {

  public readonly request: HasOneRepositoryFactory<Request, typeof Status.prototype.idState>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Status, dataSource);
    this.request = this.createHasOneRepositoryFactoryFor('request', requestRepositoryGetter);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
