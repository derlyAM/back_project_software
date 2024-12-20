import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vehicle} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleControllerController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository : VehicleRepository,
  ) {}


    // Método para obtener vehículos por user_id
    @get('/vehicles/users/{user_id}', {
      responses: {
        '200': {
          description: 'Array of Vehicles belonging to a user',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {'x-ts-type': Vehicle},
              },
            },
          },
        },
      },
    })
    async getVehiclesByUser(
      @param.path.string('user_id') userId: string,
    ): Promise<Vehicle[]> {
      // Realiza una consulta para encontrar los vehículos por user_id
      return this.vehicleRepository.find({
        where: {user_id: userId},
      });
    }  

  @post('/vehicles')
  @response(200, {
    description: 'Vehicle model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicle',
            
          }),
        },
      },
    })
    vehicle: Vehicle,
  ): Promise<Vehicle> {
    return this.vehicleRepository.create(vehicle);
  }

  @get('/vehicles/count')
  @response(200, {
    description: 'Vehicle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehicle) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.vehicleRepository.count(where);
  }

  @get('/vehicles')
  @response(200, {
    description: 'Array of Vehicle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehicle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehicle) filter?: Filter<Vehicle>,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository.find(filter);
  }

  @patch('/vehicles')
  @response(200, {
    description: 'Vehicle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {partial: true}),
        },
      },
    })
    vehicle: Vehicle,
    @param.where(Vehicle) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.vehicleRepository.updateAll(vehicle, where);
  }

  @get('/vehicles/{id}')
  @response(200, {
    description: 'Vehicle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehicle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vehicle, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehicle>
  ): Promise<Vehicle> {
    return this.vehicleRepository.findById(id, filter);
  }

  @patch('/vehicles/{id}')
  @response(204, {
    description: 'Vehicle PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {partial: true}),
        },
      },
    })
    vehicle: Vehicle,
  ): Promise<void> {
    await this.vehicleRepository.updateById(id, vehicle);
  }

  @put('/vehicles/{id}')
  @response(204, {
    description: 'Vehicle PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehicle: Vehicle,
  ): Promise<void> {
    await this.vehicleRepository.replaceById(id, vehicle);
  }

  @del('/vehicles/{id}')
  @response(204, {
    description: 'Vehicle DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehicleRepository.deleteById(id);
  }
}
