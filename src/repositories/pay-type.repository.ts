import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayType, PayTypeRelations, PayMethod} from '../models';
import {PayMethodRepository} from './pay-method.repository';

export class PayTypeRepository extends DefaultCrudRepository<
  PayType,
  typeof PayType.prototype.idType,
  PayTypeRelations
> {

  public readonly payMethod: HasOneRepositoryFactory<PayMethod, typeof PayType.prototype.idType>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>,
  ) {
    super(PayType, dataSource);
    this.payMethod = this.createHasOneRepositoryFactoryFor('payMethod', payMethodRepositoryGetter);
    this.registerInclusionResolver('payMethod', this.payMethod.inclusionResolver);
  }
}
