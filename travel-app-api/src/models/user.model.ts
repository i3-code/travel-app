import {Entity, model, property} from '@loopback/repository';
import {User as Parent} from '@loopback/authentication-jwt';

@model()
export class User extends Parent {
  @property({
    type: 'string',
    default: '',
  })
  avatar?: string;

  @property({
    type: 'boolean',
    default: '',
  })
  isAdmin?: boolean;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
