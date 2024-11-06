import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  user_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
