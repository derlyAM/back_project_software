import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Reservation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  reservation_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    required: true,
  })
  route_id: string;

  @property({
    type: 'date',
    required: true,
  })
  reservation_date: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  total_cost: number;

  @property({
    type: 'number',
    required: true,
  })
  number_seats: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
