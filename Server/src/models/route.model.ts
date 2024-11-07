import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  driver_id: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicle_id: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Route>) {
    super(data);
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
