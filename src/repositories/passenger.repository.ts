import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Passenger, PassengerRelations, PayMethod, Record, Request} from '../models';
import {PayMethodRepository} from './pay-method.repository';
import {RecordRepository} from './record.repository';
import {RequestRepository} from './request.repository';

export class PassengerRepository extends DefaultCrudRepository<
  Passenger,
  typeof Passenger.prototype.idPassenger,
  PassengerRelations
> {

  public readonly payMethods: HasManyRepositoryFactory<PayMethod, typeof Passenger.prototype.idPassenger>;

  public readonly record: HasOneRepositoryFactory<Record, typeof Passenger.prototype.idPassenger>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Passenger.prototype.idPassenger>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>, @repository.getter('RecordRepository') protected recordRepositoryGetter: Getter<RecordRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Passenger, dataSource);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.record = this.createHasOneRepositoryFactoryFor('record', recordRepositoryGetter);
    this.registerInclusionResolver('record', this.record.inclusionResolver);
    this.payMethods = this.createHasManyRepositoryFactoryFor('payMethods', payMethodRepositoryGetter,);
    this.registerInclusionResolver('payMethods', this.payMethods.inclusionResolver);
  }
}
