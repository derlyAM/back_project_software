import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnimovedatasourceDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import { HttpErrors } from '@loopback/rest';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.user_id,
  UserRelations
> {
  constructor(
    @inject('datasources.unimovedatasource') dataSource: UnimovedatasourceDataSource,
  ) {
    super(User, dataSource);
  }
  async create(entity: User, options?: object): Promise<User> {
    // Verificar que el correo no exista
    const existingUserWithEmail = await this.findOne({
      where: {email: entity.email},
    });
    if (existingUserWithEmail) {
      throw new HttpErrors.Conflict('El correo electrónico ya está registrado. Por favor, use uno diferente.');
    }

    // Verificar que el teléfono no exista
    const existingUserWithPhone = await this.findOne({
      where: {phone_number: entity.phone_number},
    });
    if (existingUserWithPhone) {
      throw new HttpErrors.Conflict('El número de teléfono ya está registrado. Por favor, use uno diferente.');
    }

    // Crear el usuario si no existen duplicados
    return super.create(entity, options);
  }
}
