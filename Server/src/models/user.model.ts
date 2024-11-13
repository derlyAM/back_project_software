import {Entity, model, property} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  user_id?: string;

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
    defaultFn: 'now',
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
    this.validate();
  }

  private validate() {
    this.validateRequired('name', this.name, 'El nombre del usuario es obligatorio.');
    this.validateMinLength('name', this.name, 3, 'El nombre debe tener al menos 3 caracteres.');
    this.validateRequired('email', this.email, 'El correo electrónico es obligatorio.');
    this.validateRequired('role', this.role, 'El rol es obligatorio.');
    this.validateRequired('status', this.status, 'El status es obligatorio.');
    this.validateRequired('phone_number', this.phone_number, 'El teléfono es obligatorio.');
    this.validateEmailFormat('email', this.email, 'El correo electrónico no tiene un formato válido.');
  }

  private validateRequired(fieldName: string, value: any, errorMessage: string) {
    if (!value) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateMinLength(fieldName: string, value: string, minLength: number, errorMessage: string) {
    if (value && value.length < minLength) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateEmailFormat(fieldName: string, value: string, errorMessage: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
