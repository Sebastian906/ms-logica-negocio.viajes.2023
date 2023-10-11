import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayMethod, PayMethodRelations, Travel, PayType, Passenger} from '../models';
import {TravelRepository} from './travel.repository';
import {PayTypeRepository} from './pay-type.repository';
import {PassengerRepository} from './passenger.repository';

export class PayMethodRepository extends DefaultCrudRepository<
  PayMethod,
  typeof PayMethod.prototype.idPayMethod,
  PayMethodRelations
> {

  public readonly travels: HasManyRepositoryFactory<Travel, typeof PayMethod.prototype.idPayMethod>;

  public readonly payType: HasOneRepositoryFactory<PayType, typeof PayMethod.prototype.idPayMethod>;

  public readonly passenger: BelongsToAccessor<Passenger, typeof PayMethod.prototype.idPayMethod>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>, @repository.getter('PayTypeRepository') protected payTypeRepositoryGetter: Getter<PayTypeRepository>, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>,
  ) {
    super(PayMethod, dataSource);
    this.passenger = this.createBelongsToAccessorFor('passenger', passengerRepositoryGetter,);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
    this.payType = this.createHasOneRepositoryFactoryFor('payType', payTypeRepositoryGetter);
    this.registerInclusionResolver('payType', this.payType.inclusionResolver);
    this.travels = this.createHasManyRepositoryFactoryFor('travels', travelRepositoryGetter,);
    this.registerInclusionResolver('travels', this.travels.inclusionResolver);
  }
}
