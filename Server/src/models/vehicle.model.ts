import {Entity, model, property} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

@model({settings: {strict: false}})
export class Vehicle extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  vehicle_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  license_plate: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'number',
    required: true,
  })
  year: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehicle>) {
    super(data);
    this.validate()
  }
  private validate() {
    this.validateRequired('user_id', this.user_id, 'El id del usuario es obligatorio.');
    this.validateRequired('type', this.type, 'El tipo vehículo es obligatorio.');
    this.validateRequired('license_plate', this.license_plate, 'La placa es obligatoria.');
    this.validateRequired('color', this.color, 'El color es obligatorio.');
    this.validateRequired('model', this.model, 'El modelo es obligatorio.');
    this.validateRequired('year', this.year, 'El año es obligatorio.');
    this.validateType('type', this.type, 'El tipo debe ser carro o moto');
  }

  private validateRequired(fieldName: string, value: any, errorMessage: string) {
    if (!value) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }
  private validateType(fieldName: string, value: any, errorMessage: string) {
    if (value != "carro" && value != "moto") {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
