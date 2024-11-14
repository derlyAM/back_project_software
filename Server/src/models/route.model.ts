import {Entity, model, property} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

@model({settings: {strict: false}})
export class Route extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  route_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origin: string;

  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @property({
    type: 'date',
    required: true,
  })
  departure_time: string;

  @property({
    type: 'number',
    required: true,
  })
  available_seats: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
  })
  driver_id: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicle_id: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Route>) {
    super(data);
    this.validate();
  }

  private validate() {
    this.validateRequired('origin', this.origin, 'El origen es obligatorio.');
    this.validateRequired('destination', this.destination, 'El destino es obligatorio.');
    this.validateRequired('departure_time', this.departure_time, 'La hora de salida es obligatoria.');
    this.validateRequired('available_seats', this.available_seats, 'El número de asientos disponibles es obligatorio.');
    this.validateRequired('price', this.price, 'El precio es obligatorio.');
    this.validateRequired('vehicle_id', this.vehicle_id, 'El id del vehículo es obligatorio.');
    this.validateTime();
    this.validateOriginAndDestination(this.origin, this.destination)
  }
  private validateRequired(fieldName: string, value: any, errorMessage: string) {
    if (!value) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateMinLength(value: string, minLength: number, errorMessage: string) {
    if (value && value.length < minLength) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateOriginAndDestination(origin: string, destination: string) {
    if (origin != "Sede central U de Caldas" && destination != "Sede central U de Caldas") {
      throw new HttpErrors.UnprocessableEntity("Origen o destino deben ser en la Sede central U de Caldas");
    }
  }

  private validateTime() {
    const currentTime = new Date();
    const departureTime = new Date(this.departure_time);
    console.log(currentTime);
    // Verificar que la hora de salida sea al menos una hora mayor que la hora actual
    currentTime.setHours(currentTime.getHours() + 1);
    if (departureTime <= currentTime) {
      throw new HttpErrors.UnprocessableEntity(
        'La hora de salida debe ser al menos una hora mayor que la hora actual.',
      );
    }
     // Validar que la hora de salida esté entre las 4 a.m. y las 11 p.m.
     const departureHours = departureTime.getHours();
     if (departureHours < 4 || departureHours > 23) {
       throw new HttpErrors.UnprocessableEntity(
         'La hora de salida debe estar entre las 4 a.m. y las 11 p.m.',
       );
     }
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
