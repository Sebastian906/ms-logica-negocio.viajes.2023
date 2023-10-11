import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Travel,
  PayMethod,
} from '../models';
import {TravelRepository} from '../repositories';

export class TravelPayMethodController {
  constructor(
    @repository(TravelRepository)
    public travelRepository: TravelRepository,
  ) { }

  @get('/travels/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayMethod belonging to Travel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PayMethod),
          },
        },
      },
    },
  })
  async getPayMethod(
    @param.path.number('id') id: typeof Travel.prototype.idTravel,
  ): Promise<PayMethod> {
    return this.travelRepository.payMethod(id);
  }
}
